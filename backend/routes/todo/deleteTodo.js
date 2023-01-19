const jwt = require("jsonwebtoken");
const ToDo = require("../../models/todo");
const config = require("./../../config/config");

const deleteToDo = (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const id = req.params.todoId;
      ToDo.deleteOne({ _id: id })
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "To-do deleted",
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

module.exports = { deleteToDo };
