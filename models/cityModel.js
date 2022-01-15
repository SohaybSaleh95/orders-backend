const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    enabled: { type: Boolean, required: true, default: false }
});

const City = mongoose.model("city", citySchema);

module.exports = City;
