const express = require("express");
const { getToken, verifyToken } = require("../../helpers/authHelper");
const {
  upload,
  imageUpload,
  fileUpload,
} = require("../../helpers/multerHelper");
const { createToDo } = require("./createTodo");
const { deleteToDo } = require("./deleteTodo");
const { getTodo } = require("./getTodo");
const { updateToDo } = require("./updateTodo");
const router = express.Router();

router.post("/create", getToken, fileUpload, imageUpload, createToDo);

router.patch("/update/:todoId", fileUpload, imageUpload, getToken, updateToDo);

router.delete("/delete/:todoId", getToken, deleteToDo);

router.post("/get", getToken, getTodo);

module.exports = router;
