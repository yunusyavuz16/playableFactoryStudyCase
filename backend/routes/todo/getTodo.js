const ToDo = require("../../models/todo");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const getTodo = async (req, res) => {
  jwt.verify(req.token, config.secret, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
    try {
      const todos = await ToDo.find({ userGuid: authData.userId });
      res.json({ todos });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};

module.exports = { getTodo };
