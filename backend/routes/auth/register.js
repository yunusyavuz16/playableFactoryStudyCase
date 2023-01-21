const User = require("./../../models/user");
const config = require("./../../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const userCheck = await User.findOne({ userName: userName });
    if (userCheck) {
      return res.json({
        isSuccess: false,
        message:
          "Kullanıcı adı daha önce kullanılmış. Lütfen başka bir kullanıcı adı ile tekrar kayıt olunuz",
      });
    }

    const mailVerify = await User.findOne({ email: email });
    if (mailVerify) {
      return res.json({
        isSuccess: false,
        message:
          "Mail adresi daha önce kullanılmış. Lütfen başka bir mail adresi ile tekrar kayıt olunuz",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const dbUser = new User();
    dbUser.password = hashedPassword.toString();
    dbUser.userName = userName;
    dbUser.email = email;
    await dbUser.save();

    const token = jwt.sign({ userId: dbUser._id }, config.secret, {
      expiresIn: "1h",
    });

    const response = {
      token,
      userName: dbUser.userName,
      email: dbUser.email,
      guid: dbUser._id,
    };

    res.status(200).send(response);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

module.exports = { register };
