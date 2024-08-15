import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    marks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marks' }] // Reference to marks collection
});

const studentModel = mongoose.model('Student', studentSchema);
export { studentModel as Student };
