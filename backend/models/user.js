const { isEmail } = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Kullanıcı adı giriniz."],
  },
  email: {
    type: String,
    validate: [isEmail, "Lütfen geçerli bir mail adresi giriniz."],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
}, { collection: 'users' });

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", userSchema);
