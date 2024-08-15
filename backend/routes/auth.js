import express from 'express';
import jwt, { decode } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { teacher } from '../models/teacher.js';
import { Student } from '../models/Student.js';


const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password, role, firstName, lastName, email } = req.body;
        console.log('Received login request:', req.body);

        if (role === 'teacher') {
            const foundTeacher = await teacher.findOne({ username });
            if (!foundTeacher) {
                console.log('Teacher not found');
                return res.json({ message: "admin not registered" });
            }
            const validPassword = await bcrypt.compare(password, foundTeacher.password);
            if (!validPassword) {
                console.log('Invalid teacher password');
                return res.json({ message: "invalid password" });
            }

            const token = jwt.sign({ username: foundTeacher.username, role: 'teacher' }, process.env.Teacher_key);
            res.cookie('token', token, { httpOnly: true, secure: true });
            console.log('Teacher login successful');
            return res.json({ login: true, role: 'teacher' });
        } else if (role === 'student') {
            const foundStudent = await Student.findOne({ email });
            if (!foundStudent) {
                console.log('Student not found');
                return res.json({ login: false, message: "Student not registered" });
            }
            if (firstName !== foundStudent.firstName || lastName !== foundStudent.lastName) {
                console.log('Invalid student name');
                return res.json({ login: false, message: "Invalid name" });
            }

            const token = jwt.sign({ email: foundStudent.email, role: 'student' }, process.env.Student_key);
            res.cookie('token', token, { httpOnly: true, secure: true });
            console.log('Student login successful');
            return res.json({ login: true, role: 'student' });
        } else {
            console.log('Invalid role');
            return res.json({ message: "Invalid role" });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.json({ message: 'Error during login', error: err });
    }
});


const verifyTeacher = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid Login" })
    } else {
        jwt.verify(token, process.env.Teacher_key, (err, decode) => {
            if (err) {
                return res.json({ message: "Invalid Token" })
            } else {
                req.username = decode.username;
                req.role = decode.role;
                next()
            }
        })
    }
}

const verifyVar = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid" })
    } else {
        jwt.verify(token, process.env.Teacher_key, (err, decode) => {
            if (err) {
                jwt.verify(token, process.env.Student_key, (err, decode) => {
                    if (err) {
                        return res.json({ message: "Invalid Token" })
                    } else {
                        req.email = decode.email;
                        req.role = decode.role;
                        next()
                    }
                })
            } else {
                req.username = decode.username;
                req.role = decode.role;
                next()
            }
        })
    }
}

router.get('/verify', verifyVar, (req, res) => {

    return res.json({ login: true, role: req.role })

})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ logout: true })
})

export { router as TeacherRouter, verifyTeacher };
