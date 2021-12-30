const mongoose = require("mongoose");

const RequestForm = mongoose.Schema(
    {
        id:{type: String},
        firstName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        adhaarNumber: { type: String, required: true },
        pinCode: { type: String, required: true },
        address: { type: String, required: true },
        age: { type: String, required: true },
        gender: { type: String, required: true },
        patientName: { type: String, required: true },
        hospitalName: { type: String, required: true },
        consultantName: { type: String, required: true },
        hospitalNumber: { type: String, required: true },
        consultantNumber: { type: String, required: true },
        bloodG: { type: String, required: true },
        RH: { type: String, required: true },
        componentName: { type: String, required: true },
        unit: { type: String, required: true },
        price: { type: String },
        date: { type: String, required: true },
        refeName: { type: String },
        refeAdhaar: { type: String },
        refePhone: { type: String },
        refeRelation: { type: String },
    },
    { timestamps: true },
    { expiresI: "1d" }
);

module.exports = mongoose.model("Request_form", RequestForm);