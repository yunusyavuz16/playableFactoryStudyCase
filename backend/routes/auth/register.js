const User = require('./../../models/user');
const config = require('./../../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
      const { userName, email, password, name } = req.body;
  
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
      const user = new User({ email, password: hashedPassword, userName, name });
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, config.secret, {
        expiresIn: "1h",
      });
  
      res.status(200).send({ token });
    } catch (error) {
      return res.status(422).send(error.message);
    }
  }

  module.exports = { register}