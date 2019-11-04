const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  studentName: {
    type: String,
    required: true,
    max: 40
  },
  accountNo: {
    type: String,
    required: true,
    max: 40
  },
  acadYear: {
    type: String,
    required: true,
    max: 40
  },
  studentId: {
    type: String,
    required: true,
    max: 40
  },
  studentType: {
    type: String,
    max: 40
  },
  semester: {
    type: String,
    required: true,
    max: 40
  },
  sex: {
    type: String,
    required: true,
    max: 40
  },
  course: {
    type: String,
    required: true,
    max: 40
  },
  major: {
    type: String,
    required: true,
    max: 40
  },
  yearLevel: {
    type: String,
    required: true,
    max: 40
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
