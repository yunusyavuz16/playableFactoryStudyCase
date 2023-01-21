const config = require("../../config/config");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.status(404).send({ error: "User not found" });
    }

    const isSuccess = await bcrypt.compare(password, dbUser.password);

    if (!isSuccess) {
      return res.status(401).json({
        errorMessage: "Şifrenizi yanlış girdiniz.",
        isSuccess,
        password,
        dbPass: dbUser.password,
      });
    }

    const token = jwt.sign({ userId: dbUser._id }, config.secret, {
      expiresIn: "1h",
    });
    const response = {
      token,
      userName: dbUser.userName,
      email: dbUser.email,
      guid: dbUser._id,
    };
    res.send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { login };
