const express =require ("express")
const app= express();
const ordersRoute = require("./routes/orders");
const productTypeRoute = require("./routes/productType");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const authenticate = require("./routes/utils/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.send("<h1>Hello World</h1>");

});


app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.use("/orders", authenticate);
app.use("/orders", ordersRoute);

app.use("/products", productTypeRoute);

module.exports = app;