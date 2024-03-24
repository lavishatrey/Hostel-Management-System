const mongoose = require("mongoose")

const wardenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Teacher"
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    teachHostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hostel',
    },
    teachBatch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'batch',
        required: true,
    },
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        presentCount: {
            type: String,
        },
        absentCount: {
            type: String,
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model("warden", wardenSchema)