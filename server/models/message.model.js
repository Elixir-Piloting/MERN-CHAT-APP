const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the message schema
const MessageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId, // This will hold the user ID of the sender
            ref: 'User', // Reference to the User model
            required: true
        },
        recipient: {
            type: Schema.Types.ObjectId, // This will hold the user ID of the recipient
            ref: 'User', // Reference to the User model
            required: true
        },
        content: {
            type: String, // The message content
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now // Automatically sets the time when the message is created
        },
        read: {
            type: Boolean,
            default: false // Whether the message is read or not
        }
    },
    { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

// Create and export the Message model
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
