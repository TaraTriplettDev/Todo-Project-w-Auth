const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Auth = require("./authModel");

// Schema for creating new ToDo objects

const ToDoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: "Auth"
  }
});

const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;
