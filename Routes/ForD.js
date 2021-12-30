const verify = require("../verifyToken");
const forDonor = require("../Model/ForDonor")
const router = require("express").Router();
const BloodList = require("../Model/ForBlood");

///////POST
router.post("/fordonor", verify, async (req, res) => {
    if (req.user.isAdmin) {
        // const updateList = await BloodList.findOneAndUpdate(
        //     { componentName: req.body.componentName },
        //     { $set: { unit: req.body.unit } }
        // )
        // await updateList.save();

        const form = new forDonor({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            DOB: req.body.DOB,
            phoneNumber: req.body.phoneNumber,
            adhaarNumber: req.body.adhaarNumber,
            componentName: req.body.componentName,
            unit: req.body.unit,
            address: req.body.address,
            pinCode: req.body.pinCode,
        });

        try {
            const formData = await form.save();
            res.status(201).json(formData);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    } else {
        res.status(403).json({ message: "You are not Admin" });
    }
})

router.get("/blood", async (req, res) => {
    try {
        const bloodStock = await forDonor.find().sort({_id:-1});
        res.status(201).json(bloodStock);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router;