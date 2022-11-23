const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    addName: { type: String, required: true, default: "Home" },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
});

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    address: [addressSchema],
    token: { type: String, required: true },
});



const User = mongoose.model("users", userSchema);

module.exports = User;
