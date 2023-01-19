const express = require("express");
const { checkJwt } = require("../../helpers/authHelper");
const { upload } = require("../../helpers/multerHelper");
const { createToDo } = require("./createTodo");
const { deleteToDo } = require("./deleteTodo");
const { updateToDo } = require("./updateTodo");
const router = express.Router();

router.post("/create", checkJwt, upload.single("image"), createToDo);

router.patch("/update/:todoId", checkJwt, updateToDo);

router.delete("/delete/:todoId", checkJwt, deleteToDo);

module.exports = router;
