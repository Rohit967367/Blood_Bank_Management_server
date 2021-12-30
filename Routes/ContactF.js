const router = require("express").Router();
const User = require("../Model/User")
const Form = require("../Model/ContactForm");
const verify = require("../verifyToken");


//////FORM_FOR_CONTACT
router.post("/contact", async (req, res) => {
    const alreadyEmail = await User.findOne({email: req.body.email})
    if (alreadyEmail) {
        const form = new Form(req.body)
        try {
            const ContactForm = await form.save();
            res.status(201).json(ContactForm);
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json({messgage: "jana re"});
    }
})


////////For_GET
router.get("/cForm", verify, async (req, res)=> {
  const query = req.query.new;
    if (req.user.isAdmin) {
        try {
          const ContactForm = query ? await Form.find().sort({_id:-1}).limit(2) : await Form.find();
          res.status(200).json(ContactForm);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
      else {
        res.status(403).json({ message: "You are not allowed to see all users" });
      }
})

module.exports = router;