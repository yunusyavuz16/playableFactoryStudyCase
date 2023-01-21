const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user");

const router = express.Router();

router.post("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({
      guid: user._id,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
