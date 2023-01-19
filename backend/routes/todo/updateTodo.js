const jwt = require("jsonwebtoken");
const { imageUpload, fileUpload } = require("../../helpers/multerHelper");
const ToDo = require("../../models/todo");
const config = require("./../../config/config");

const updateToDo = (req, res) => {
  jwt.verify(
    req.token,
    config.secret,
    imageUpload,
    fileUpload.array("files", 10),
    (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const id = req.params.todoId;
        const image = req.files.find((file) => file.fieldname === "image").path;
        const files = req.files
          .filter((file) => file.fieldname === "files")
          .map((file) => file.path);
        ToDo.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              task: req.body.task,
              image,
              files,
              tags: req.body.tags,
            },
          },
          { new: true },
          (err, todo) => {
            if (err) {
              return res.status(500).json({
                message: "Error when getting todo",
                error: err,
              });
            }
            if (!todo) {
              return res.status(404).json({
                message: "No such todo",
              });
            }
            return res.json(todo);
          }
        );
      }
    }
  );
};

module.exports = { updateToDo };
