const dotenv = require('dotenv');
dotenv.config();  // ✅ Load environment variables

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticated = async (req, res, next) => {
    try {
        // ✅ Check if token exists in cookies
        const token = req.cookies.token;

        if (!token) {
            console.error(" No token provided");
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }

        // ✅ Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error(" Invalid or expired token");
            return res.status(403).json({ message: "Invalid or expired token." });
        }

        // ✅ Fetch user from DB
        const user = await User.findById(decoded.id);
        if (!user) {
            console.error(" User not found in DB");
            return res.status(404).json({ message: "User not found." });
        }

        // ✅ Attach user to request object
        req.user = user;

        // ✅ Move to the next middleware or route
        next();
    } catch (error) {
        console.error(" Authentication Error:", error);
        return res.status(500).json({ message: "Authentication failed." });
    }
};

module.exports = authenticated;
