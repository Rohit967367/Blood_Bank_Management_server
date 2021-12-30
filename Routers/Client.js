// const router = require("express").Router();
// const User = require("../Models/User");
// // const CryptoJS = require("crypto-js");
// const varify = require("../VerifyTokenFor");


// ///update
// router.get("/userlist", varify, async (req,res)=> {
//     if(req.user.isAdmin){

//         try {
//             const user = await User.find()
//             res.status(200).json(user)
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     }
// })

// module.exports = router;