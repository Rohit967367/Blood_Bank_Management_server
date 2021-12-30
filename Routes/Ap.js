// const verify = require("../verifyToken");
const Aposit = require("../Model/Aposit");
const router = require("express").Router();
// const User = require("../Model/User")



//////POST
router.post("/apois", async (req, res) => {
    // if (req.user.isAdmin) {
        const A = new Aposit(req.body)
        try {
            const Apositive = await A.save();
            res.status(201).json(Apositive);
        } catch (error) {
            console.log(error)
            res.status(503).json({ message: error });
        }
    // } else { res.status(403).json({ message: "Yor are not Admin" }) }
});

module.exports = router;