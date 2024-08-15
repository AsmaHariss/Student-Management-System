import express from 'express';
import { Marks } from '../models/Marks.js';
const router = express.Router();
import { Student } from '../models/Student.js';

router.post('/entermarks', async (req, res) => {
    try {
        const { studentEmail, tamil, science, islam, maths, english, history, ICT, commerce, geography } = req.body;

        if ([tamil, science, islam, maths, english, history, ICT, commerce, geography, studentEmail].some(val => val == null)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const student = await Student.findOne({ email: studentEmail });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const newMarks = new Marks({
            tamil,
            science,
            islam,
            maths,
            english,
            history,
            ICT,
            commerce,
            geography,
            studentId: student._id
        });

        await newMarks.save();

        await Student.findByIdAndUpdate(student._id, { $push: { marks: newMarks._id } });

        return res.json({ added: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message || "Error in submit marks" });
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

router.get('/mark/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const mark = await Marks.findById({ _id: id })
        return res.json(mark)
    } catch (err) {
        return res.json(err)
    }
})

router.put('/mark/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const mark = await Marks.findByIdAndUpdate({ _id: id }, req.body)
        return res.json({ updated: true, mark })
    } catch (err) {
        return res.json(err)
    }
})


export { router as MarksRouter };
