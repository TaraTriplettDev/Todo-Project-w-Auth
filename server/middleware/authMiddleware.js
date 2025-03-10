const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

// const middleware = (req, res, next) => {
//   console.log("MiddleWare HIT!");
//   console.log("Auth Check", req.headers.cookie);

//   if (!req.headers.cookie) {
//     console.log("No cookie");
//     res.json({ msg: "No cookie?" });
//   } else {
//     console.log("")
//   }
// }


const authCheck = (req, res) => {
  console.log("Auth Check", req.headers.cookie);

  if (!req.headers.cookie) {
    console.log("No Cookie Found");

    res.json({ msg: "No Cookies?" });
  } else {
    console.log("Cookie Found!", req.headers.cookie.split("="));

    let split = req.headers.cookie.split("");

    console.log("Split", split[1]);

    jwt.verify(split[1], process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        console.log("JWT Error");
        res.json({ msg: "JWT Error" });
      }
      console.log("Payload", payload);
      Auth.findById(payload._id);
      Auth.findOne({ username: payload.username })
        .then((found) => {
          console.log("found", found);
          res.json({ msg: "valid token", found });
        })
        .catch((err) => console.log("err", err));
    });
  }
}