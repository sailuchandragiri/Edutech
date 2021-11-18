const express = require("express")
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

const router = express.Router()


// router.post('/', async (req, res) => {
//     const mobile = req.body.mobile

//     // const user = new User({
//     //     mobile
//     // })

//     // user.save()


//     const user = await User.create({
//         mobile
//     })

//     res.status(201).send("created mobile no.")
// }

router.post("/", body("mobile").isLength({ min: 10, max: 10 }).withMessage("Enter valid mobile number"), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Please Enter Valid Number" });
    }

    try {

        const userCheck = await User.find()
        const user = await User.create({
            name: req.body.name,
            mobile: req.body.mobile,
            otp: Math.floor(1000 + Math.random() * 9000)
        })
        const { otp } = user
        return res.send(alert(`Your otp is`, otp))

    } catch (err) {
        return res.send("err");
    }

})

module.exports = router;
