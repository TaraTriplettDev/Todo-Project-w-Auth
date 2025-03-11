const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Auth = require("../models/authModel");

module.exports = {
  // This takes in the axios request from handleRegisterSubmit and, if its values pass the requirements,
  // it hashes the password and creates a new Auth containing the values

  register: (req, res) => {
    console.log("Req HIT!", req.body);

    Auth.findOne({ username: req.body.username })
      .then((found) => {
        console.log("found", found);
        if (!found) {
          console.log("Unique Username");
          const hash = bcrypt.hashSync(req.body.password, 10);
          console.log("Hash", hash);

          const newUser = new Auth({
            username: req.body.username,
            password: hash,
          });

          Auth.create(newUser).then((created) => {
            console.log("created", created);
          });
        } else {
          console.log("Username Taken");
        }
      })
      .catch((err) => console.log(err));
  },

  // This takes in the axios request from handleLoginSubmit and searches the database for a matching login object

  // If a matching login object is found, a token is generated with an expiration date of one hour post creation

  login: (req, res) => {
    console.log("login", req.body);

    Auth.findOne({ username: req.body.username }).then((found) => {
      console.log("found", found);

      if (bcrypt.compareSync(req.body.password, found.password)) {
        console.log("Good Login");

        const token = jwt.sign(
          { username: found.username, _id: found._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        res
          .cookie("Token", token, {
            httpOnly: true,
            magAge: 3600000,
          })
          .json({ msg: "Good Login", found });
      } else {
        console.log("Bad Login");
        res.json({ msg: "Bad Login" });
      }
    });
  },
  authCheck: (req, res) => {
    console.log("AUTH CHECK", req.user);
  },
};
