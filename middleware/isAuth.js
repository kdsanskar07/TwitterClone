const jwt = require("jsonwebtoken");
const Config = require("../config/config");

const PRIV_KEY = Config.development.private_key;

module.exports = (req, res, next) => {
  try {

    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw "Invalid authHeader";
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw "Invalid token";
    }

    const decodedToken = jwt.verify(token, PRIV_KEY);
    if (!decodedToken) {
      throw "Invalid decodedToken";
    }

    req.isAuth = true;
    req.id = decodedToken.userId;
    console.log(`User: ${req.id} is Authenticated`)
  } catch (error) {
    console.log(`Inside isAuth`, error);
    req.isAuth = false;
  } finally {
    next();
  }
};
