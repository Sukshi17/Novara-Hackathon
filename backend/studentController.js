const Student = require('../models/Student');

// Add a student
exports.addStudent = async (req, res) => {
    try {
        const { name, email, rollNumber, department, year } = req.body;

        // Validation
        if (!name || !email || !rollNumber || !department || !year) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingStudent = await Student.findOne({ rollNumber });
        if (existingStudent) {
            return res.status(400).json({ message: 'Roll number already exists.' });
        }

        const newStudent = new Student({ name, email, rollNumber, department, year });
        await newStudent.save();

        res.status(201).json({ message: 'Student added successfully!', student: newStudent });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Roll number already exists.' });
        }
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const { search } = req.query; // Intentionally ignore department as requested

        let query = {};

        // Search EXCLUSIVELY by name (strict start-of-string matching, case-insensitive)
        if (search) {
            // Escape special regex characters in search string to prevent regex injection
            const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            query.name = { $regex: "^" + safeSearch, $options: 'i' };
        }

        const students = await Student.find(query);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ message: 'Student deleted successfully.', student: deletedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
