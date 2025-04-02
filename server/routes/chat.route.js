const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const authenticated = require("../middleware/authenticate");
const Message = require("../models/message.model");


router.post('/send-message/:recipientId', authenticated, async (req, res) => {
    const { content } = req.body;  // Extract content from the request body
    const recipientId = new mongoose.Types.ObjectId(req.params.recipientId);  // Get recipientId from URL
    const senderId = new mongoose.Types.ObjectId(req.user.id);  // Get senderId from authenticated user

    try {
        // Check if sender and recipient exist
        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);

        if (!sender || !recipient) {
            return res.status(400).json({ message: "Sender or recipient not found." });
        }

        // Create the new message
        const newMessage = new Message({
            sender: sender._id,
            recipient: recipient._id,
            content
        });

        // Save the message to the database
        await newMessage.save();

        return res.status(201).json({ success: true, message: "Message sent!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error sending message." });
    }
});


router.get('/fetch/:recipientId', authenticated, async(req, res)=>{
    const recipientId = new mongoose.Types.ObjectId(req.params.recipientId);
    const me = new mongoose.Types.ObjectId(req.user.id);

    const messages = await Message.find({
        $or: [
            { sender: me }, 
            { recipient: recipientId }
        ]
    }).sort({ createdAt: -1 }); 

    res.status(200).json({success: true, messages});

});

router.get('/messages', authenticated, async (req, res) => {
    const me = new mongoose.Types.ObjectId(req.user.id);
    
        const chats = await Message.find({
            $or: [
                { recipient: me },
                { sender: me }
            ]
        }).sort({ createdAt: -1 }); // Sort messages from newest to oldest

        return res.status(200).json({ success: true, messages: chats });

    
        console.error(err);
        return res.status(500).json({ success: false, message: "Error retrieving messages." });
    
});



module.exports = router;