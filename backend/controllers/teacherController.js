const supabase = require('../config/db');

const getAssignedStudents = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const { data, error } = await supabase
            .from('teacher_student')
            .select('students(id, reg_no, users(name, email))')
            .eq('teacher_id', teacherId);

        if (error) throw error;
        res.json(data.map(item => item.students));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const assignMarks = async (req, res) => {
    const { studentId, teacherId, subject, score } = req.body;
    try {
        const { data, error } = await supabase
            .from('marks')
            .insert([
                { student_id: studentId, teacher_id: teacherId, subject, score }
            ])
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAssignedStudents, assignMarks };