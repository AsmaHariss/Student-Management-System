import express from 'express';
import { Student } from '../models/Student.js';
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, age } = req.body;
        const foundStudent = await Student.findOne({ email });
        if (foundStudent) {
            return res.json({ message: "This email address already registered" });
        }
        const newStudent = new Student({
            firstName,
            lastName,
            email,
            age
        });

        await newStudent.save();
        return res.json({ registered: true });
    } catch (err) {
        return res.json({ message: "Error in register" });
    }
});

router.get('/details', async (req, res) => {
    console.log("Request received at /details");
    try {
        const students = await Student.find().populate('marks');
        console.log("Student details fetched successfully");
        return res.json(students);
    } catch (err) {
        console.error("Error fetching student details:", err);
        return res.status(500).json({ message: err.message || "Error fetching student details" });
    }
});

router.delete('/student/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const student = await Student.findByIdAndDelete({_id: id})
        return res.json({deleted:true, students})
    } catch (err) {
        return res.json(err)
    }
})


export { router as StudentRouter };
