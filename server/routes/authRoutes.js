const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const authenticated = require("../middleware/authenticate");

const saltRounds = 10;
const cookieParser = require("cookie-parser");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res
        .status(404)
        .json({ success: false, message: " please fill all fields" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res
        .status(400)
        .json({ success: false, message: "user with that email exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ success: true, message: `user created` });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `internal server error` });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(404)
      .json({ success: false, message: "please fill in all fields" });
  }

  userExists = await User.findOne({ email });
  if (!userExists) {
    res
      .status(404)
      .json({ success: false, message: "User with that email does not exist" });
  }

  const passwordMatch = await bcrypt.compare(password, userExists.password);
  if (!passwordMatch) {
    res.status(401).json({ success: false, message: "invalid credentials" });
  }
  const token = jwt.sign(
    { id: userExists._id.toString() }, // Convert ObjectId to string
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).json({ success: true, message: "login success", token });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/profile", authenticated, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const {username, email, profile_pic} = req.user;
    res.status(200).json({ success: true , user: {username,email,profile_pic}});
});

  

module.exports = router;
