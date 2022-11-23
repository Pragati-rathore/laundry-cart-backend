const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = require("./User");
const Store = require("./Store");

const productSchema = new Schema({
    prodType: {
        type: String,
        //enum: [
        //"shirts",
        //"tshirts",
        //"trousers",
        //"jeans",
        //"boxers",
        //"joggers",
        //"others",
        //],
        required: true,
    },
    //serviceCharge: {
    //wash: { type: Number, required: true },
    //iron: { type: Number, required: true },
    //dryClean: { type: Number, required: true },
    //bleaching: { type: Number, required: true },
    //},
    quantity: { type: Number, required: true, default: 0 },
    washType: {
        wash: { type: Boolean, required: true, default: false },
        iron: { type: Boolean, required: true, default: false },
        dryClean: { type: Boolean, required: true, default: false },
        bleaching: { type: Boolean, required: true, default: false },
    },
});

const orderSchema = new Schema(
    {
        userId: { type: ObjectId, ref: User, required: true },
        add: {
            addName: { type: String, required: true, default: "Home" },
            address: { type: String, required: true },
            pincode: { type: Number, required: true },
            state: { type: String, required: true },
            district: { type: String, required: true },
        },
        storeId: { type: ObjectId, ref: Store, required: true },
        order: [productSchema],
        status: {
            type: String,
            enum: [
                "Ready to pickup",
                "In washing",
                "Canceled",
                "Ready to deliver",
                "In ironing",
            ],
            required: true,
            default: "Ready to pickup",
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
