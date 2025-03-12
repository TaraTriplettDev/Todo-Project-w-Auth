const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for creating new ToDo objects

const ToDoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
});

const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;
