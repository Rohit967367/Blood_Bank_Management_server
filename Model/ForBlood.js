const mongoose = require("mongoose");

const BloodStock = new mongoose.Schema(
    {
        bloodName: { type: String },
        rh: { type: String},
        componentName: { type: String, required: true },
        unit: { type: Number },
        price: { type: Number }
    }, { timestamps: true }
);

module.exports = mongoose.model("Blood_Stock_List", BloodStock);