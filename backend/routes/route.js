const router = require('express').Router();

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');

const { adminRegister, adminLogIn, getAdminDetail} = require('../controllers/admin-controller.js');

const { batchCreate, batchList, deleteBatch, deleteBatches, getBatchDetail, getBatchStudents } = require('../controllers/batch-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByBatch,
    updateExamResult,
    clearAllStudentsAttendanceByHostel,
    clearAllStudentsAttendance,
    removeStudentAttendanceByHostel,
    removeStudentAttendance } = require('../controllers/student_controller.js');
const { hostelCreate, batchHostels, deleteHostelsByBatch, getHostelDetail, deleteHostel, freeHostelList, allHostels, deleteHostels } = require('../controllers/hostel-controller.js');
const { wardenRegister, wardenLogIn, getWardens, getWardenDetail, deleteWardens, deleteWardensByBatch, deleteWarden, updateWardenHostel, wardenAttendance } = require('../controllers/warden-controller.js');

// Admin
router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)
// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsBatch/:id", deleteStudentsByBatch)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceByHostel);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceByHostel);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Warden

router.post('/WardenReg', wardenRegister);
router.post('/WardenLogin', wardenLogIn)

router.get("/Wardens/:id", getWardens)
router.get("/Warden/:id", getWardenDetail)

router.delete("/Wardens/:id", deleteWardens)
router.delete("/WardensBatch/:id", deleteWardensByBatch)
router.delete("/Warden/:id", deleteWarden)

router.put("/WardenHostel", updateWardenHostel)

router.post('/WardenAttendance/:id', wardenAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Batch

router.post('/BatchCreate', batchCreate);

router.get('/BatchList/:id', batchList);
router.get("/Batch/:id", getBatchDetail)

router.get("/Batch/Students/:id", getBatchStudents)

router.delete("/Batches/:id", deleteBatches)
router.delete("/Batch/:id", deleteBatch)

// Hostel

router.post('/HostelCreate', hostelCreate);

router.get('/AllHostels/:id', allHostels);
router.get('/BatchHostels/:id', batchHostels);
router.get('/FreeHostelList/:id', freeHostelList);
router.get("/Hostel/:id", getHostelDetail)

router.delete("/Hostel/:id", deleteHostel)
router.delete("/Hostels/:id", deleteHostels)
router.delete("/HostelsBatch/:id", deleteHostelsByBatch)

module.exports = router;