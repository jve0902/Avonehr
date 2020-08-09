//https://bezkoder.com/node-js-mongodb-auth-jwt/

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      let verifyErrMsg = "Unauthorized!";
      if (err.name === "TokenExpiredError") {
        verifyErrMsg = "Token Expired!";
      }
      return res.status(401).send({ message: verifyErrMsg });
    }
    req.patientId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
