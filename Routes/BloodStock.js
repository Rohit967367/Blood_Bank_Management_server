const router = require("express").Router();
const BloodList = require("../Model/ForBlood");
const verify = require("../verifyToken");


////post All info
router.post("/bloodStock", verify, async (req, res) => {

    if (req.user.isAdmin) {
        const blood = new BloodList(req.body)
        try {
            const bloodContainer = await blood.save()
            res.status(201).json(bloodContainer)
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        window.alert("you are to allow");
    }

})


////post manually
router.post("/bloodStock/update", async (req, res) => {

    // if(isAdmin)
    const blood = new BloodList({
        bloodName: req.body.bloodName,
        rh: req.body.rh,
        componentName: req.body.componentName,
        unit: req.body.unit,
        price: req.body.price,
    })

    try {
        const bloodContainer = await blood.save()
        res.status(201).json(bloodContainer)
    } catch (error) {
        res.status(500).json(error);
    }

})


////update BloodStock ny Id
router.put("/bloodStock/:id", async (req, res) => {

    // if(isAdmin)
    try {
        const { id } = req.params;
        // const updateBlood = await BloodList.findByIdAndUpdate(req.params.id,
        //     { $set: req.body },
        //     { upsert: true }
        // )
        const foundBlood = await BloodList.findOne({ _id: id });
        foundBlood.unit = foundBlood.unit - 1
        const updateBlood = await foundBlood.save()
        res.status(200).json(updateBlood)
    } catch (error) {
        res.status(500).json(error);
    }

})

router.get("/bloodStock/BloodList", verify, async (req, res) => {
    // const bloodName = req.query.componentName;
    // let blood = []
    if (req.user.isAdmin) {
        try {
            // if (bloodName) {
            //     blood = await BloodList.aggregate([
            //         { $match: { componentName: bloodName } }
            //     ]).sort()
            // } else {
            //     blood = await BloodList.aggregate([{ $sample: { size: 25 } }])
            // }
            // res.status(200).json(blood)

            // const bloodStockList = query ? await BloodList.find().sort({_id:-1}).limit(5) : await BloodList.find().sort({_id: -1}); 
            const BloodStockList = await BloodList.find().sort({ _id: -1 });
            res.status(200).json(BloodStockList);
        } catch (error) {
            console.log(error)
        }
    } else {
        res.status(403).json({ message: "You are not allowed to see all users" });
    }
})





///////Update by name
router.put("/bloodStock/update/:id", async (req, res) => {
    try {
        const updatelist = await BloodList.findByIdAndUpdate(
            req.params.id,
            { $set: { unit: req.body.unit } },
            { new: true }
        )
        res.status(200).json(updatelist)
    } catch (error) {
        res.status(500).json(error)
    }
})



/////Dtetel item by Id
router.delete("/bloodStock/:id", async (req, res) => {

    // if(isAdmin)
    try {
        await BloodList.findByIdAndDelete(req.params.id)
        res.status(200).json(`the ${res.params.id} id is delete`)
    } catch (error) {
        res.status(500).json(error);
    }

})


//////Get By Blood Name and RH
router.get("/bloodStock/find", async (req, res) => {
    const name = req.query.bloodName;
    const type = req.query.rh;
    let postive = [];
    try {
        if (name) {
            if (type) {
                postive = await BloodList.aggregate([
                    { $match: { bloodName: name, rh: type } }
                ])
            } else {
                postive = await BloodList.aggregate([
                    { $match: { bloodName: name } }
                ])
            }
        }
        else {
            postive = await BloodList.aggregate([{ $sample: { size: 50 } }])
        }
        res.status(200).json(postive)
    } catch (error) {
        res.status(500).json(error)
    }
})



//////Get By Unit
router.get("/bloodStock/BloodName", async (req, res) => {
    const compName = req.query.componentName;


    let post = [];
    try {
        if (compName) {
            post = await BloodList.aggregate([
                { $match: { componentName: compName } }
            ])
        }
        else {
            post = await BloodList.aggregate([{ $sample: { size: 50 } }])
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


/////Get ByBloodName RH And Componentname
router.get("/bloodStock/get", async (req, res) => {
    const name = req.query.bloodName;
    const type = req.query.rh;
    const compoName = req.query.componentName;

    let postive = [];
    try {
        if (name) {
            if (type) {
                if (compoName) {
                    postive = await BloodList.aggregate([
                        { $match: { bloodName: name, rh: type, componentName: compoName } }
                    ])
                } else {
                    postive = await BloodList.aggregate([
                        { $match: { bloodName: name, rh: type } }
                    ])
                }
            } else {
                postive = await BloodList.aggregate([
                    { $match: { bloodName: name } }
                ])
            }
        }
        else {
            postive = await BloodList.aggregate([{ $sample: { size: 50 } }])
        }
        res.status(200).json(postive)
    } catch (error) {
        res.status(500).json(error)
    }
})





/////Just Trying
router.put("/bloodStock/inc", async (req, res) => {
    try {
        const updateInclist = await BloodList.findOneAndUpdate(

            { componentName: req.body.unit },
            { $inc: { unit: 1 } },
            { new: true }
        )
        res.status(200).json(updateInclist)
    } catch (error) {
        res.status(500).json(error)
    }
})

/////update by Name
// router.put("/BloodStock/name", (req, res)=> {
//     const compo = req.query.componentName;
//     try {
//         if(compo){

//         }
//     } catch (error) {
//         console.log(errror)
//     }
// })

module.exports = router;
