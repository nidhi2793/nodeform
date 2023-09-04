const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("in middleware");
  next();
});

app.use((req, res, next) => {
  console.log("in second middleware");
  res.send({ key: "value" });
});

app.listen(4000);
