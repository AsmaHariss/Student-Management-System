import express from 'express'
import bcrypt from 'bcrypt'
import { teacher } from './models/teacher.js'
import './db.js'

async function TeacherAccount() {


    try {
        const teacherCount = await teacher.countDocuments()
        if (teacherCount === 0) {
            const hashPassword = await bcrypt.hash('teacherpassword', 10)
            const newTeacher = new teacher({
                username: 'admin',
                password: hashPassword
            })
            newTeacher.save()
            console.log("account created")
        } else {
            console.log("account already exists")
        }
    } catch (err) {
        console.log("error")
    }

}
TeacherAccount()