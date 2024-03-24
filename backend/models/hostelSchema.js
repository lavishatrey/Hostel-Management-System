const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: true,
    },
    subCode: {
        type: String,
        required: true,
    },
    sessions: {
        type: String,
        required: true,
    },
    batchName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'batch',
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    warden: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'warden',
    }
}, { timestamps: true });

module.exports = mongoose.model("hostel", hostelSchema);