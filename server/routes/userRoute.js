const express = require("express");
const userRoute = express.Router();
const { login, signup } = require("../controller/userController");

userRoute.post("/login", login);
userRoute.post("/signup", signup);

module.exports = userRoute;
