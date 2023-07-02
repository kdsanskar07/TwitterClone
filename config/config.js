const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const path = require("path");
const pathToKey_pub = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUBLIC_KEY = fs.readFileSync(pathToKey_pub, "utf8");
const pathToKey_priv = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIVATE_KEY = fs.readFileSync(pathToKey_priv, "utf8");

module.exports = {
  node_env: process.env.NODE_ENV,
  development: {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    public_key: PUBLIC_KEY,
    private_key: "I am twitter clone",
  },
};
