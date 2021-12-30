const router = require("express").Router();
const UserList = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");


///Register
router.post("/register", async (req, res) => {

    try {

        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            return res.status(422).json({ error: "Email ID Is Already Existed" });
        }

        const NewUser = new UserList({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString(),
        });
        const user = await NewUser.save();
        res.status(201).json({ messge: "your account created", user });

    } catch (error) {
        console.log(error)
    }
})

///Login
router.post("/login", async (req, res) => {
    try {
        const user = await UserList.findOne({ email: req.body.email });
        !user && res.status(401).json("Wrong email")

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.status(401).json("Wrong Password Or Username!");

        const { password, ...info } = user._doc

        const accesstoken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        )

        res.status(200).json({ ...info, accesstoken })

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;