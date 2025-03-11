const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for creating new ToDo objects

const ToDoSchema = new Schema({
  newToDo: {
    type: String,
    required: true,
    unique: true,
  },
});

const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;
