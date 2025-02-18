const supabase = require('../config/db');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        console.log("Get all users")
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    console.log("Create new user");
    const { name, email, password, role } = req.body;
    console.log(name, email, password, role)
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
            .from('users')
            .insert([
                { name, email, password_hash: hashedPassword, role }
            ])
            .select();

        res.status(201).json(data[0]);
        if (error) throw error;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try {
        const { data, error } = await supabase
            .from('users')
            .update({ name, email, role })
            .eq('id', id)
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const assignStudentToTeacher = async (req, res) => {
    const { studentId, teacherId } = req.body;
    try {
        const { data, error } = await supabase
            .from('teacher_student')
            .insert([
                { teacher_id: teacherId, student_id: studentId }
            ])
            .select();

        res.status(201).json({
            message: 'Student successfully assigned to teacher',
            assignment: data[0]
        });
        if (error) throw error;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudents = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('*').eq('role', 'student')
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getTeachers = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('*').eq('role', 'teacher')
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getUsers, createUser, updateUser, deleteUser, assignStudentToTeacher, getStudents, getTeachers };