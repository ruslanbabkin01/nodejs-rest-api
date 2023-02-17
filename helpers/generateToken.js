const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(data) {
  const payload = { data };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
  return token;
}

module.exports = generateToken;
