const Hostel = require('../models/hostelSchema.js');
const Warden = require('../models/wardenSchema.js');
const Student = require('../models/studentSchema.js');

const hostelCreate = async (req, res) => {
    try {
        const hostels = req.body.hostels.map((hostel) => ({
            subName: hostel.subName,
            subCode: hostel.subCode,
            sessions: hostel.sessions,
        }));

        const existingHostelBySubCode = await Hostel.findOne({
            'hostels.subCode': hostels[0].subCode,
            college: req.body.adminID,
        });

        if (existingHostelBySubCode) {
            res.send({ message: 'Sorry this subcode must be unique as it already exists' });
        } else {
            const newHostels = hostels.map((hostel) => ({
                ...hostel,
                batchName: req.body.batchName,
                college: req.body.adminID,
            }));

            const result = await Hostel.insertMany(newHostels);
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const allHostels = async (req, res) => {
    try {
        let hostels = await Hostel.find({ college: req.params.id })
            .populate("batchName", "batchName")
        if (hostels.length > 0) {
            res.send(hostels)
        } else {
            res.send({ message: "No hostels found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const batchHostels = async (req, res) => {
    try {
        let hostels = await Hostel.find({ batchName: req.params.id })
        if (hostels.length > 0) {
            res.send(hostels)
        } else {
            res.send({ message: "No hostels found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const freeHostelList = async (req, res) => {
    try {
        let hostels = await Hostel.find({ batchName: req.params.id, warden: { $exists: false } });
        if (hostels.length > 0) {
            res.send(hostels);
        } else {
            res.send({ message: "No hostels found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getHostelDetail = async (req, res) => {
    try {
        let hostel = await Hostel.findById(req.params.id);
        if (hostel) {
            hostel = await hostel.populate("batchName", "batchName")
            hostel = await hostel.populate("warden", "name")
            res.send(hostel);
        }
        else {
            res.send({ message: "No hostel found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteHostel = async (req, res) => {
    try {
        const deletedHostel = await Hostel.findByIdAndDelete(req.params.id);

        // Set the teachHostel field to null in wardens
        await Warden.updateOne(
            { teachHostel: deletedHostel._id },
            { $unset: { teachHostel: "" }, $unset: { teachHostel: null } }
        );

        // Remove the objects containing the deleted hostel from students' examResult array
        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedHostel._id } } }
        );

        // Remove the objects containing the deleted hostel from students' attendance array
        await Student.updateMany(
            {},
            { $pull: { attendance: { subName: deletedHostel._id } } }
        );

        res.send(deletedHostel);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteHostels = async (req, res) => {
    try {
        const deletedHostels = await Hostel.deleteMany({ college: req.params.id });

        // Set the teachHostel field to null in wardens
        await Warden.updateMany(
            { teachHostel: { $in: deletedHostels.map(hostel => hostel._id) } },
            { $unset: { teachHostel: "" }, $unset: { teachHostel: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedHostels);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteHostelsByBatch = async (req, res) => {
    try {
        const deletedHostels = await Hostel.deleteMany({ batchName: req.params.id });

        // Set the teachHostel field to null in wardens
        await Warden.updateMany(
            { teachHostel: { $in: deletedHostels.map(hostel => hostel._id) } },
            { $unset: { teachHostel: "" }, $unset: { teachHostel: null } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedHostels);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { hostelCreate, freeHostelList, batchHostels, getHostelDetail, deleteHostelsByBatch, deleteHostels, deleteHostel, allHostels };