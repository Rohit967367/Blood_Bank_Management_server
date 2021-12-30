const mongoose = require("mongoose");

const ForDonor = mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        gender: {type: String, required: true},
        DOB: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        adhaarNumber: {type: String, required: true},
        componentName: {type: String, required: true},
        unit: {type: String, required: true},
        address: {type: String, required: true},
        pinCode: {type: String, required: true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("ForDonor", ForDonor);