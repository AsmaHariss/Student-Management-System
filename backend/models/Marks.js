import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
    tamil: { type: Number, required: true },
    science: { type: Number, required: true },
    islam: { type: Number, required: true },
    maths: { type: Number, required: true },
    english: { type: Number, required: true },
    history: { type: Number, required: true },
    ICT: { type: Number, required: true },
    commerce: { type: Number, required: true },
    geography: { type: Number, required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true } // This is okay for reference
});

const marksModel = mongoose.model('Marks', marksSchema);
export { marksModel as Marks };
