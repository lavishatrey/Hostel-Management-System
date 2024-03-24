const bcrypt = require('bcrypt');
const Warden = require('../models/wardenSchema.js');
const Hostel = require('../models/hostelSchema.js');

const wardenRegister = async (req, res) => {
    const { name, email, password, role, college, teachHostel, teachBatch } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const warden = new Warden({ name, email, password: hashedPass, role, college, teachHostel, teachBatch });

        const existingWardenByEmail = await Warden.findOne({ email });

        if (existingWardenByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await warden.save();
            await Hostel.findByIdAndUpdate(teachHostel, { warden: warden._id });
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const wardenLogIn = async (req, res) => {
    try {
        let warden = await Warden.findOne({ email: req.body.email });
        if (warden) {
            const validated = await bcrypt.compare(req.body.password, warden.password);
            if (validated) {
                warden = await warden.populate("teachHostel", "subName sessions")
                warden = await warden.populate("college", "collegeName")
                warden = await warden.populate("teachBatch", "batchName")
                warden.password = undefined;
                res.send(warden);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Warden not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getWardens = async (req, res) => {
    try {
        let wardens = await Warden.find({ college: req.params.id })
            .populate("teachHostel", "subName")
            .populate("teachBatch", "batchName");
        if (wardens.length > 0) {
            let modifiedWardens = wardens.map((warden) => {
                return { ...warden._doc, password: undefined };
            });
            res.send(modifiedWardens);
        } else {
            res.send({ message: "No wardens found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getWardenDetail = async (req, res) => {
    try {
        let warden = await Warden.findById(req.params.id)
            .populate("teachHostel", "subName sessions")
            .populate("college", "collegeName")
            .populate("teachBatch", "batchName")
        if (warden) {
            warden.password = undefined;
            res.send(warden);
        }
        else {
            res.send({ message: "No warden found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateWardenHostel = async (req, res) => {
    const { wardenId, teachHostel } = req.body;
    try {
        const updatedWarden = await Warden.findByIdAndUpdate(
            wardenId,
            { teachHostel },
            { new: true }
        );

        await Hostel.findByIdAndUpdate(teachHostel, { warden: updatedWarden._id });

        res.send(updatedWarden);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteWarden = async (req, res) => {
    try {
        const deletedWarden = await Warden.findByIdAndDelete(req.params.id);

        await Hostel.updateOne(
            { warden: deletedWarden._id, warden: { $exists: true } },
            { $unset: { warden: 1 } }
        );

        res.send(deletedWarden);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteWardens = async (req, res) => {
    try {
        const deletionResult = await Warden.deleteMany({ college: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No wardens found to delete" });
            return;
        }

        const deletedWardens = await Warden.find({ college: req.params.id });

        await Hostel.updateMany(
            { warden: { $in: deletedWardens.map(warden => warden._id) }, warden: { $exists: true } },
            { $unset: { warden: "" }, $unset: { warden: null } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteWardensByBatch = async (req, res) => {
    try {
        const deletionResult = await Warden.deleteMany({ batchName: req.params.id });

        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            res.send({ message: "No wardens found to delete" });
            return;
        }

        const deletedWardens = await Warden.find({ batchName: req.params.id });

        await Hostel.updateMany(
            { warden: { $in: deletedWardens.map(warden => warden._id) }, warden: { $exists: true } },
            { $unset: { warden: "" }, $unset: { warden: null } }
        );

        res.send(deletionResult);
    } catch (error) {
        res.status(500).json(error);
    }
};

const wardenAttendance = async (req, res) => {
    const { status, date } = req.body;

    try {
        const warden = await Warden.findById(req.params.id);

        if (!warden) {
            return res.send({ message: 'Warden not found' });
        }

        const existingAttendance = warden.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString()
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            warden.attendance.push({ date, status });
        }

        const result = await warden.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error)
    }
};

module.exports = {
    wardenRegister,
    wardenLogIn,
    getWardens,
    getWardenDetail,
    updateWardenHostel,
    deleteWarden,
    deleteWardens,
    deleteWardensByBatch,
    wardenAttendance
};