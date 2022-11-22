const express = require("express");
const app = express();

//body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.send("<h1>Hello World</h1>");
});

module.exports = app;
