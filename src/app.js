const express = require("express");
const app = express();
const ordersRoute = require("./routes/orders");
const productTypeRoute = require("./routes/productType");
const storeRoute = require("./routes/stores");
const userRoute = require("./routes/user");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const authenticate = require("./routes/utils/auth");

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.use("/orders", authenticate);
app.use("/orders", ordersRoute);

app.use("/users", authenticate);
app.use("/users", userRoute);

app.use("/products", productTypeRoute);
app.use("/stores", storeRoute);

module.exports = app;
