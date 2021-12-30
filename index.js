const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = require("./Routes/auth");
const userRouter = require("./Routes/UserList");
const ContactForm = require("./Routes/ContactF");
const DonorForm = require("./Routes/DonorF");
const RequestForm = require("./Routes/RequestF");
const ForDonor = require("./Routes/ForD");
const Aposit = require("./Routes/Ap");
const BloodStock = require("./Routes/BloodStock");

const cors = require("cors")

dotenv.config()


mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlparser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(() => console.log("DB Connection is successfull"))
    .catch((err) => console.log(err));
    
app.use(cors())
app.use(express.json())
app.use("/api/auth", router);
app.use("/api/users", userRouter);
app.use("/api", ContactForm);
app.use("/api", DonorForm);
app.use("/api", RequestForm);
app.use("/api", ForDonor);
app.use("/api/bloodstock", Aposit);
app.use("/api", BloodStock);

app.listen(8800, () => {
    console.log("connection success");
})