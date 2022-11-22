const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

mongoose.connect(MONGODB_URI, { dbName: "laundrycart" }, (err) => {
    if (err) {
        console.log("Mongoose connect error:: ");
        console.dir(err);
    }
});

mongoose.connection.on("connecting", () => {
    console.log("DB Connecting...");
});

mongoose.connection.on("connected", () => {
    console.log("DB Connected");
});

mongoose.connection.on("reconnected", () => {
    console.log("DB Reconnected");
});

mongoose.connection.on("disconnecting", () => {
    console.log("DB Disconnecting...");
});

mongoose.connection.on("disconnected", () => {
    console.log("DB Disconnected");
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Error::");
    console.dir(err);
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("App listen err::");
        console.dir(err);
    } else {
        console.log("App listening on PORT:: ", PORT);
    }
});
