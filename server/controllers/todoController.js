const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ToDo = require("../models/todoModel");

module.exports = {
  // asynchronously searches for ToDo objects in the database and returns a response json containing the ToDo List
  getTodos: async (req, res, next) => {
    try {
      const todos = await ToDo.find({});
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  // asynchronously awaits new ToDos then logs them
  createTodo: async (req, res, next) => {
    try {
      const newTodo = await ToDo.create(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  },
};
