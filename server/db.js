const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: String,
  studentEmail: String,
  institution: String,
  enrolmentDateTime: Number,
  enrolmentStatus: String,
  googleCloudSkillsBoostProfileURL: String,
  numberOfCoursesCompleted: Number,
  numberOfSkillBadgesCompleted: Number,
  numberOfGenAIGameCompleted: Number,
  totalCompletionsOfBothPathways: String,
  redemptionStatus: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
