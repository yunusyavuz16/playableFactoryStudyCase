const express = require("express");
const { getToken } = require("../../helpers/authHelper");
const {
  upload,
  imageUpload,
  fileUpload,
} = require("../../helpers/multerHelper");
const { createToDo } = require("./createTodo");
const { deleteToDo } = require("./deleteTodo");
const { updateToDo } = require("./updateTodo");
const router = express.Router();

router.post(
  "/create",
  getToken,
  fileUpload,
  imageUpload,
  createToDo
);

router.patch(
  "/update/:todoId",
  fileUpload,
  imageUpload,
  getToken,
  updateToDo
);

router.delete("/delete/:todoId", getToken, deleteToDo);

module.exports = router;
