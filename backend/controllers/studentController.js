const supabase = require('../config/db');

const getStudentProfile = async (req, res) => {
    const { studentId } = req.params;
    try {
        const { data, error } = await supabase
            .from('students')
            .select('id, reg_no, users(name, email, role)')
            .eq('id', studentId)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Student not found' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAssignedTeacher = async (req, res) => {
    const { studentId } = req.params;
    try {
        const { data, error } = await supabase
            .from('teacher_student')
            .select('teachers(id, subject, users(name, email))')
            .eq('student_id', studentId)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'No assigned teacher found' });
        res.json(data.teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentMarks = async (req, res) => {
    const { studentId } = req.params;
    try {
        const { data, error } = await supabase
            .from('marks')
            .select('id, subject, score, created_at, users!marks_teacher_id_fkey(name)')
            .eq('student_id', studentId);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStudentProfile, getAssignedTeacher, getStudentMarks };