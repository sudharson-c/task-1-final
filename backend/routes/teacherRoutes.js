const express = require('express');
const { getAssignedStudents, assignMarks } = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:teacherId/students', authMiddleware, getAssignedStudents);
router.post('/assign-marks', authMiddleware, assignMarks);

module.exports = router; 