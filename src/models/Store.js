const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    stName: {type: String, required: true},
    stAdd: {type: String, required: true},
    phone: {type: Number, required: true}
});

const Store = mongoose.model('stores', storeSchema);

module.exports = Store;
