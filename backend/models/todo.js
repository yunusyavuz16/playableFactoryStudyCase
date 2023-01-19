const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userGuid: { type: String, required: true },
  task: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  files: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("ToDo", todoSchema);
