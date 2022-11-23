const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTypeSchema = new Schema({
    prodName: { type: String, required: true }, //shirt, tshirt, trousers etc
    prodCharges: [Number], //[wash, iron, dryClean, bleaching]
});

const ProductType = mongoose.model("productTypes", productTypeSchema);

module.exports = ProductType;
