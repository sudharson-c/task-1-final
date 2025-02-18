const express = require('express');
const { getUsers, getStudents, createUser, updateUser, deleteUser, assignStudentToTeacher } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['admin']), getUsers);
router.get('/students', authMiddleware, roleMiddleware(['admin']), getStudents);
router.post('/', authMiddleware, roleMiddleware(['admin']), createUser);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUser);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);
router.post('/assign', authMiddleware, roleMiddleware(['admin']), assignStudentToTeacher);


module.exports = router; 