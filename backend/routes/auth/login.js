const config = require("../../config/config");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      return res.status(401).send({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, config.secret, {
      expiresIn: "1h",
    });
    
    res.send({ token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { login };
