const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

const userController = require("./controllers/userController");
// const {
//   register,
//   login,
//   verify,
//   refresh,
//   logout,
// } = require("./controllers/authController");

const courseController = require("./controllers/courseController");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cookieParser());
app.use(express.json());

app.use("/all-courses", courseController);
app.use('/users', userController)



// app.post("/register", body("mobile").isLength({ min: 10, max: 10 }).withMessage("Enter valid mobile number"), register);
// app.post("/login", login);
// app.post("/verify", verify);
// app.post("/refresh", refresh);
// app.get("/logout", logout);

module.exports = app;
