const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./src/graphql/schemas");
const isAuth = require("./middleware/isAuth");
const path = require("path");
const config = require("./config/config");
const db = require("./config/db");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use("/graphql", (req, res) => {
  graphqlHTTP({
    schema: graphQlSchema,
    graphiql: process.env.NODE_ENV === "development",
    context: { req },
  })(req, res);
});

if (config.node_env === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(__dirname, "client", "build", "index.html");
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

app.listen(config[config.node_env].port, () => {
  console.log("Server is up and running at Port", config[config.node_env].port);
});
