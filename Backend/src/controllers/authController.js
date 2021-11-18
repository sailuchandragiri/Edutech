const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { body, validationResult } = require('express-validator');



// const accountSid = process.env.ACCOUNT_SID
// const authToken = process.env.AUTH_TOKEN
// const client = require('twilio')(accountSid, authToken)
// const crypto = require('crypto')

// const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
// const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
// const smsKey = process.env.SMS_SECRET_KEY
// let refreshTokens = []



// const newToken = (user) => {
//     return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
// }

const register = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: "Please Enter Valid Number" });
    }

    const mobile = req.body.mobile


    // ===================================================================================================
    // const otp = Math.floor(100000 + Math.random() * 900000)
    // const ttl = 2 * 60 * 1000
    // const expires = Date.now() + ttl
    // const data = `${mobile}.${otp}.${expires}`
    // const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')
    // const fullhash = `${hash}.${expires}`

    // client.messages.create({
    //     body: `Your one time password for Edutech Login is ${otp}`,
    //     from: +12059526786,
    //     to: `${+91}${mobile}`
    // }).then((messages) => console.log(messages)).catch((err) => console.error(err))

    // res.status(200).send({ mobile, hash: fullhash, otp })

    // =========================================================================================================





    // check if user with same mobile already exists

    let user;

    try {

        user = User.findOne({ mobile: mobile })

        // if yes then throw an error
        if (user) return res.status(400).send({ message: "Mobile no. already exists." })

        // else create user with that mobile no
        user = User.create({
            mobile
        })

        // we will create a token

        const token = newToken(user)

        // token will be sent to frontend

        res.status(200).send({ user, token })

    } catch (err) {

        return res.status(500).send({ message: "Sorry for inconvenience please try again later" })
    }
}



// ===========================================================================================
// =============================================================================================
// ===========================================================================================

// const verify = async (req, res) => {
//     const mobile = req.body.mobile;
//     const hash = req.body.hash;
//     const otp = req.body.otp;
//     let [hashValue, expires] = hash.split('.')

//     let now = Date.now()
//     if (now > parseInt(expires)) {
//         return res.status(504).send({ msg: `Timeout Please try again` })
//     }

//     let data = `${mobile}.${otp}.${expires}`
//     let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')

//     if (newCalculatedHash === hashValue) {

//         // refreshTokens.push(refreshToken)

//         // return res.status(202).send({ msg: "User confirmed" })
//         const accessToken = jwt.sign({ data: mobile }, JWT_AUTH_TOKEN, { expiresIn: '30s' })
//         const refreshToken = jwt.sign({ data: mobile }, JWT_REFRESH_TOKEN, { expiresIn: '1y' })

//         res.status(202).
//             cookie('accessToken', accessToken, { expiresIn: new Date(new Date().getTime() * 30 * 1000), sameSite: 'strict', httpOnly: true })
//             .cookie('authSession', true, { expiresIn: new Date(new Date().getTime() * 30 * 1000) })
//             .cookie('refreshToken', refreshToken, { expiresIn: new Date(new Date().getTime() * 3557600000), sameSite: 'strict', httpOnly: true }).send({ msg: 'Device verified' })
//             .cookie('refreshTokenId', true, { expiresIn: new Date(new Date().getTime() * 3557600000) })
//     } else {
//         return res.status(400).send({ verification: false, msg: "Incorrect otp" })
//     }
// }


// async function authenticate(req, res, next) {
//     const accessToken = req.cookie.accessToken

//     jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, mobile) => {
//         if (mobile) {
//             req.mobile = mobile;
//             next()
//         } else if (err.message === 'TokenExpiredError') {
//             return res.status(403).send({ success: false, msg: "Access Token Expired" })
//         } else {
//             console.error(err)
//             res.status(403).send({ err, msg: 'User Not Authenticated' })
//         }
//     })
// }


// const refresh = async (req, res) => {
//     const refreshToken = req.cookies.refreshToken

//     if (!refreshToken) return res.status(403).send({ msg: 'Refresh Token not Found, please login again' })

//     if (!refreshTokens.includes(refreshToken)) return res.status(403).send({ msg: 'Refresh Token Blocked' })

//     jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, mobile) => {
//         if (!err) {
//             const accessToken = jwt.sign({ data: mobile }, JWT_AUTH_TOKEN, { expiresIn: '30s' })

//             res.status(202).
//                 cookie('accessToken', accessToken, { expiresIn: new Date(new Date().getTime() * 30 * 1000), sameSite: 'strict', httpOnly: true })
//                 .cookie('authSession', true, { expiresIn: new Date(new Date().getTime() * 30 * 1000) })
//                 .send({ previousSessionExpiry: true, success: true })
//         } else {
//             return res.status(403).send({ success: false, msg: "Invalid Refresh Token" })
//         }
//     })

// }


// const logout = async (req, res) => {
//     res.clearCookie('refreshToken').clearCookie('accessToken').clearCookie('authSession').clearCookie('refreshTokenId').send('User Logged Out')
// }



// ======================================================================================================
// =========================================================================================================
// ======================================================================================================


const login = async (req, res) => {

    const mobile = req.body.mobile

    try {

        let user;

        // check if user with that mobile already exists

        user = await User.findOne({ mobile: mobile })


        // if not then throw an error

        if (!user) return res.status(400).send({ message: "Account doesn't exists... Please register" })

        // (if it exists then match the password
        // if not match then throw an error)

        // =============================================================I have to send the otp-------------------------------->>>>>

        // else we will create a token for that user

        const token = NewToken(user)

        // send the token to the frontend

        res.status(200).send({ user, token })

    } catch (err) {
        return res.status(500).send({ message: "Sorry for inconvenience please try again later" })
    }



}

module.exports = { register, login, verify, refresh, logout }