const router = require("express").Router();
const User = require("../Model/User")
const Form = require("../Model/RequestForm");
const verify = require("../verifyToken");
const ForDonor = require("../Model/ForDonor");
const BloodList = require("../Model/ForBlood");



//////FORM_FOR_DONOR
router.post("/requestform", async (req, res) => {
    const alreadyEmail = await User.findOne({ email: req.body.email })
    const adhaar = await ForDonor.findOne({ adhaarNumber: req.body.adhaarNumber })
    const adhaar2 = await Form.findOne({ adhaarNumber: req.body.adhaarNumber })
    // const adhaar = await .findOne({ adhaarNumber: req.body.adhaarNumber })
    // const adhaar = await findById({ adhaarNumber: req.params.adhaarNumber })
    if (alreadyEmail) {
        // const updateList = await BloodList.findOneAndUpdate(
        //     { componentName: req.body.componentName },
        //     { $set: { unit: req.body.unit } }
        // )
        // await updateList.save();

        if (adhaar && !adhaar2) {

            const withOutPrice = new Form({
                id: req.body.id,
                firstName: req.body.firstName,
                email: req.body.email,
                adhaarNumber: req.body.adhaarNumber,
                pinCode: req.body.pinCode,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                patientName: req.body.patientName,
                age: req.body.age,
                gender: req.body.gender,
                hospitalName: req.body.hospitalName,
                consultantName: req.body.consultantName,
                hospitalNumber: req.body.hospitalNumber,
                consultantNumber: req.body.consultantNumber,
                bloodG: req.body.bloodG,
                RH: req.body.RH,
                componentName: req.body.componentName,
                unit: req.body.unit,
                date: req.body.date,
                refeName: req.body.refeName,
                refeAdhaar: req.body.refeAdhaar,
                refePhone: req.body.refePhone,
                refeRelation: req.body.refeRelation,
            })


            const RequestForm = await withOutPrice.save();
            // res.status(200).json("ye match hoo gaya")
            res.status(201).json(RequestForm);
        }
        else {
            const form = new Form(req.body)
            const RequestForm = await form.save();
            // res.status(200).json("ye match hoo gaya")
            res.status(201).json(RequestForm);
        }
    } else {
        res.status(403).json({ messgage: "Your Are not Authenticated" });
    }
});


// function getValueForNextSequence(sequenceOfName) {

//     var sequenceDoc = db.BloodList.findAndModify({
//         query: { unit: sequenceOfName },
//         update: { $inc: { seqval: 1 } },
//         new: true
//     });

//     return sequenceDoc.seqval;
// }

////////For_GET
router.get("/rForm", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const RequestForm = query ? await Form.find().sort({ _id: -1 }).limit(5) : await Form.find();
            res.status(200).json(RequestForm);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    else {
        res.status(403).json({ message: "You are not a admin" });
    }
});

router.get("/RequestForm/:id", async (req, res) => {
    // try {
    // const adhaar = await ForDonor.findById(req.params.adhaarNumber)
    const adhaar = await ForDonor.findById(req.params.adhaarNumber)
    const alreadyEmail = await User.findById(req.params.email)
    if (alreadyEmail) {
        // if (req.fordonor.adhaarNumber === adhaar) {
        //     res.status(200).json("ye match hoo gaya")

        if (adhaar) {
            res.status(200).json("match nahi hoona chahiye, aur ye dekhna chahiye");
        }
        else {
            try {
                const UserListById = await User.findById(req.params.id);
                // const form = new Form(req.body)
                const { price, ...info } = UserListById._doc;
                // const RequestForm = await info.save();
                // res.status(200).json("ye match hoo gaya")
                res.status(201).json(info);
            } catch (error) {
                res.status(500).json(error);
            }
            // try {
            //     const form = new Form(req.body)
            //     const RequestForm = await form.save();
            //     res.status(201).json(RequestForm);
            // } catch (error) {
            //     res.status(500).json(error);
            // }
        }
        // }
    } else {
        res.status(403).json({ messgage: "Your Are not Authenticated" });
    }
    // } catch (error) {
    //     res.status(500).json(error)
    // }
})



router.get("/getAdhaar", async (req, res) => {
    const adhaar = req.query.adhaarNumber;
    let adhaarDetails = [];
    try {
        if (adhaar) {
            adhaarDetails = await Form.aggregate([
                { $match: { adhaarNumber: adhaar } }
            ])
            res.status(200).json(adhaarDetails)
        } else {
            res.status(401).json("please give your aadhar")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;