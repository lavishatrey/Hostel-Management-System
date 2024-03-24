const Batch = require('../models/batchSchema.js');
const Student = require('../models/studentSchema.js');
const Hostel = require('../models/hostelSchema.js');
const Warden = require('../models/wardenSchema.js');

const batchCreate = async (req, res) => {
    try {
        const batch = new Batch({
            batchName: req.body.batchName,
            college: req.body.adminID
        });

        const existingBatchByName = await Batch.findOne({
            batchName: req.body.batchName,
            college: req.body.adminID
        });

        if (existingBatchByName) {
            res.send({ message: 'Sorry this batch name already exists' });
        }
        else {
            const result = await batch.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const batchList = async (req, res) => {
    try {
        let batches = await Batch.find({ college: req.params.id })
        if (batches.length > 0) {
            res.send(batches)
        } else {
            res.send({ message: "No batches found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getBatchDetail = async (req, res) => {
    try {
        let batch = await Batch.findById(req.params.id);
        if (batch) {
            batch = await batch.populate("college", "collegeName")
            res.send(batch);
        }
        else {
            res.send({ message: "No batch found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getBatchStudents = async (req, res) => {
    try {
        let students = await Student.find({ batchName: req.params.id })
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteBatch = async (req, res) => {
    try {
        const deletedBatch = await Batch.findByIdAndDelete(req.params.id);
        if (!deletedBatch) {
            return res.send({ message: "Batch not found" });
        }
        const deletedStudents = await Student.deleteMany({ batchName: req.params.id });
        const deletedHostels = await Hostel.deleteMany({ batchName: req.params.id });
        const deletedWardens = await Warden.deleteMany({ teachBatch: req.params.id });
        res.send(deletedBatch);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteBatches = async (req, res) => {
    try {
        const deletedBatches = await Batch.deleteMany({ college: req.params.id });
        if (deletedBatches.deletedCount === 0) {
            return res.send({ message: "No batches found to delete" });
        }
        const deletedStudents = await Student.deleteMany({ college: req.params.id });
        const deletedHostels = await Hostel.deleteMany({ college: req.params.id });
        const deletedWardens = await Warden.deleteMany({ college: req.params.id });
        res.send(deletedBatches);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { batchCreate, batchList, deleteBatch, deleteBatches, getBatchDetail, getBatchStudents };