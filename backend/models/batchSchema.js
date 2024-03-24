const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    batchName: {
        type: String,
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
}, { timestamps: true });

module.exports = mongoose.model("batch", batchSchema);

