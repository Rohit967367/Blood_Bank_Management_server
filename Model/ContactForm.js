const mongoose = require("mongoose");

const ContactForm = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phoneNumber: { type: String, required: true, trim: true },
        ///////phir se data base banana hai becoz of this

        subject: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact_Form", ContactForm);