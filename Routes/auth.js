// const router = require("express").Router();
// const User = require("../Model/User");
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");

// //REGISTER
// router.post("/register", async (req, res) => {
//   const newUser = new User({
//     username: req.body.username,
//     email: req.body.email,
//     password: CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.SECRET_KEY
//     ).toString(),
//   });
//   try {
//     const user = await newUser.save();
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


const router = require("express").Router();
const User = require("../Model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: CryptoJS.AES.encrypt(
          req.body.password, 
          process.env.SECRET_KEY
          ).toString(),
        confirmPassword: req.body.confirmPassword,
    });
    // console.log(newUser)
    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
})



// //LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     !user && res.status(401).json("Wrong password or username!");

//     const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
//     const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

//     originalPassword !== req.body.password &&
//       res.status(401).json("Wrong password or username!");

//     const accessToken = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.SECRET_KEY,
//       { expiresIn: "5d" }
//     );

//     const { password, ...info } = user._doc;

//     res.status(200).json({ ...info, accessToken });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

/////////this is alag






////ye mersa hai
//LOGIN
router.post("/login", async (req, res) => {
    try {
        // const user = await User.findOne({ phoneNumber: req.body.phoneNumber });


        ////ye real wala
        // const login = await User.findOne({ phoneNumber: req.body.phoneNumber });

        ///ye checker hai mera
        const login = await User.findOne({ email: req.body.email });
        // !user && res.status(401).json("you are already use this phone number");
        !login && res.status(401).json("you are not log-in");

        // const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const bytes = CryptoJS.AES.decrypt(login.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("your password is invaild ");

        const accessToken = jwt.sign(
            // { id: user._id, isAdmin: user.isAdmin },
            { id: login._id, isAdmin: login.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
        );

        // const { password, ...info } = user._doc;
        const { password, ...info } = login._doc;

        res.status(200).json({ ...info, accessToken });
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;