const mongoose = require('mongoose');
const Student = require('./models/Student');

const departments = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Information Technology", "Electronics and Communication"];
const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharva", "Aarush", "Ananya", "Diya", "Navya", "Kavya", "Myra", "Saanvi", "Aadhya", "Pari", "Riya", "Aarohi", "Anushka", "Avni", "Mahi", "Sarah", "Sneha"];
const lastNames = ["Sharma", "Verma", "Gupta", "Malhotra", "Singh", "Patel", "Kumar", "Rao", "Reddy", "Nair", "Iyer", "Joshi", "Das", "Bose", "Ghosh", "Mehta", "Chawla", "Bansal", "Agarwal", "Kapoor"];

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
    .then(async () => {
        console.log('MongoDB connected for seeding');
        try {
            await Student.deleteMany({}); // Optional: clear existing
            const students = [];
            for (let i = 1; i <= 100; i++) {
                const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
                const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
                const department = departments[Math.floor(Math.random() * departments.length)];
                const year = Math.floor(Math.random() * 4) + 1; // 1 to 4

                students.push({
                    name: `${fname} ${lname}`,
                    email: `${fname.toLowerCase()}.${lname.toLowerCase()}${i}@university.edu`,
                    rollNumber: `CS24${String(i).padStart(3, '0')}`,
                    department: department,
                    year: year
                });
            }
            await Student.insertMany(students);
            console.log('100 students successfully inserted');
            process.exit(0);
        } catch (err) {
            console.error('Error seeding data:', err);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
