const mongoose = require("mongoose");

const BloodList = new mongoose.Schema(
    {
        bloodName: { type: String },
        rh: { type: Boolean, default: false },
        componentName: {type: Array}
    }, { timestamps: true }
);

module.exports = mongoose.model("BloodList", BloodList);