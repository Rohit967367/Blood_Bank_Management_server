const mongoose = require("mongoose");

const Aposit = mongoose.Schema(
    {
        email: {type: String, required: true},
        componentName: {type: String, required: true},
        unit: {type: String, required: true}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Aposit", Aposit);
