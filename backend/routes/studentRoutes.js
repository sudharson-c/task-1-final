const express = require('express');
const { getStudentProfile, getAssignedTeacher, getStudentMarks } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:studentId/profile', authMiddleware, getStudentProfile);
router.get('/:studentId/teacher', authMiddleware, getAssignedTeacher);
router.get('/:studentId/marks', authMiddleware, getStudentMarks);

module.exports = router; 