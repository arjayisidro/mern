const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdmissionSchema = new Schema({
  admissionId: {
    type: String,
    max: 40
  },
  lastName: {
    type: String,
    required: true,
    max: 40
  },
  firstName: {
    type: String,
    required: true,
    max: 40
  },
  middleName: {
    type: String,
    required: true,
    max: 40
  },
  sex: {
    type: String,
    max: 40
  },
  birthDate: {
    type: String,
    max: 40
  },
  civilStatus: {
    type: String,
    required: true,
    max: 40
  },
  cellNumber: {
    type: String,
    required: true,
    max: 40
  },
  religion: {
    type: String,
    required: true,
    max: 40
  },
  bplace: {
    type: String,
    required: true,
    max: 40
  },
  street: {
    type: String,
    required: true,
    max: 40
  },
  barangay: {
    type: String,
    required: true,
    max: 40
  },
  municipality: {
    type: String,
    required: true,
    max: 40
  },
  province: {
    type: String,
    required: true,
    max: 40
  },
  zipCode: {
    type: String,
    required: true,
    max: 40
  },
  learnersPreference: {
    type: String,
    required: true,
    max: 40
  },
  mothersLastName: {
    type: String,
    required: true,
    max: 40
  },
  mothersFirstName: {
    type: String,
    required: true,
    max: 40
  },
  mothersLastName: {
    type: String,
    required: true,
    max: 40
  },
  occupation: {
    type: String,
    required: true,
    max: 40
  },
  fathersFirstName: {
    type: String,
    required: true,
    max: 40
  },
  fathersMiddleName: {
    type: String,
    required: true,
    max: 40
  },
  fathersLastName: {
    type: String,
    required: true,
    max: 40
  },
  fatherOccupation: {
    type: String,
    required: true,
    max: 40
  },
  houseHoldIncome: {
    type: String,
    required: true,
    max: 40
  },

  highSchool: {
    type: String,
    required: true,
    max: 40
  },
  hsYearGraduated: {
    type: String,
    required: true,
    max: 40
  },
  seniorHighSchool: {
    type: String,
    required: true,
    max: 40
  },
  seniorYearGraduated: {
    type: String,
    required: true,
    max: 40
  },
  college: {
    type: String,
    required: true,
    max: 40
  },
  collegeYearGraduated: {
    type: String,
    required: true,
    max: 40
  },
  courseMajor: {
    type: String,
    required: true,
    max: 40
  },
  semesterSchoolYear: {
    type: String,
    required: true,
    max: 40
  },
  requirements: {
    type: String,
    required: true,
    max: 40
  },
  course1: {
    type: String,
    required: true,
    max: 40
  },
  course2: {
    type: String,
    required: true,
    max: 40
  },
  course3: {
    type: String,
    required: true,
    max: 40
  }
});

module.exports = Admission = mongoose.model('admission', AdmissionSchema);
