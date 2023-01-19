const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const User = require("../../models/user");
const { login } = require("./login");
const { register } = require("./register");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);


module.exports = router;
