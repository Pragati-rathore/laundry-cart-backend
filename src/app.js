const express = require("express");
const app = express();
const ordersRoute = require("./routes/orders");

//body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.send("<h1>Hello World</h1>");

});

app.use("/orders", ordersRoute);

module.exports = app;
