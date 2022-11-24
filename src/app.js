const express =require ("express")
const app= express();
const ordersRoute = require("./routes/orders");
const productTypeRoute = require("./routes/productType");

app.use(require("./routes/register"))
app.use(require("./routes/login"))
const registerRoute= (require("./routes/register"))
const loginRoute =(require("./routes/login"))
const User = require("./models/User")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.send("<h1>Hello World</h1>");

});



app.use("/orders", ordersRoute);
app.use("/products", productTypeRoute);
app.use("/register",registerRoute)
app.use("/login",loginRoute)

module.exports = app;





