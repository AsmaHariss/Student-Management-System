import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }

})

const teacherModel = mongoose.model('teacher', teacherSchema)
export { teacherModel as teacher }