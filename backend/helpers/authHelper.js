const jwt = require("jsonwebtoken");

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = { checkJwt };
