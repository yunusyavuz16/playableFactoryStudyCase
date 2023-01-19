const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { checkJwt } = require("../helpers/authHelper");
const User = require("../models/user");

const router = express.Router();

router.post("/profile", checkJwt, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
