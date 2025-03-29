const mongoose = require("mongoose");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const ToDo = require("../models/todoModel");

// Setting routes for the controller

module.exports = (app) => {
  // Auth
  app.post("/api/register", authController.register);
  app.post("/api/login", authController.login);
  app.get("/authCheck", authMiddleware, authController.authCheck);

  // Todo

  // returns ToDo objects to the ToDo app in json files
  app.get("/gettodos/:id", (req, res) => {
    console.log("GetToDos HIT!", req.params.id);
    ToDo.find({user: req.params.id})
      .then((found) => {
        console.log("found", found);
        res.json(found);
      })
      .catch((err) => console.log(err));
  });

  // takes the content of posts from the ToDo app and returns them to be displayed there
  app.post("/create", (req, res) => {
    console.log("Create HIT!", req.body);
    ToDo.create(req.body)
      .then((created) => {
        console.log("created", created);
        res.json(created);
      })
      .catch((err) => console.log(err));
  });

  // accesses a ToDo object by its id and deletes it
  app.delete("/delete/:id", authMiddleware, (req, res) => {
    console.log("Delete HIT", req.params);
    ToDo.findByIdAndDelete(req.params.id)
      .then((deleted) => {
        console.log("deleted", deleted);
        res.json(deleted);
      })
      .catch((err) => console.log(err));
  });

  // accesses a ToDo object by its id and submits changes to its contents set on the ToDo app
  app.put("/edit/:id", authMiddleware, (req, res) => {
    console.log("Edit HIT!", req.params.id, req.body);
    ToDo.findById(req.params.id)
    .then((found) => {
      console.log("found", found);
      found.todo = req.body.todo;
      found.save();
      res.json(found);
    })
    .then((updated) => {
      console.log("updated", updated)
      res.json(updated)
    })
  });

  // const PORT = 3000;

  // app.listen(PORT, () => {
  //   mongoose
  //     .connect(process.env.MONGO_URI || "mongodb://localhost")
  //     .then(() => {
  //       console.log("Database Connected");
  //     })
  //     .catch((err) => console.log(err));

  //   console.log(`Server connected at Port ${PORT}`);
  // });
};
