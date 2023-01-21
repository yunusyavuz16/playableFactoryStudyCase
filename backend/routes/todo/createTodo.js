const jwt = require("jsonwebtoken");
const ToDo = require("../../models/todo");
const config = require("./../../config/config");

const createToDo = (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const image = req.files?.find((file) => file.fieldname === "image").path;
      const files = req.files
        ?.filter((file) => file.fieldname === "files")
        .map((file) => file.path);
      const todo = new ToDo({
        userGuid: authData.userId,
        task: req.body.task,
        image,
        tags: req.body.tags,
        files,
      });
      todo
        .save()
        .then((result) => {
          res.status(201).json({
            message: "To-do created",
            todo: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

module.exports = { createToDo };
