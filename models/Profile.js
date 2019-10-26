const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  heiName: {
    type: String,
    required: true,
    max: 40
  },
  heiUUI: {
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
    max: 40
  },
  emailAdd: {
    type: String,
    max: 40
  },
  lastName: {
    type: String,
    required: true,
    max: 40
  },
  givenName: {
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
    required: true,
    max: 40
  },
  birthDate: {
    type: String,
    required: true,
    max: 40
  },
  completeProgramName: {
    type: String,
    required: true,
    max: 40
  },
  yearLevel: {
    type: String,
    required: true,
    max: 40
  },
  mothersLastName: {
    type: String,
    required: true,
    max: 40
  },
  mothersGivenName: {
    type: String,
    required: true,
    max: 40
  },
  mothersMiddleName: {
    type: String,
    required: true,
    max: 40
  },
  fathersLastName: {
    type: String,
    required: true,
    max: 40
  },
  fathersGivenName: {
    type: String,
    required: true,
    max: 40
  },
  fathersMiddleName: {
    type: String,
    required: true,
    max: 40
  },
  streetAndBarangay: {
    type: String,
    required: true,
    max: 40
  },
  townAndMunicipality: {
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
  totalAssesment: {
    type: String,
    required: true,
    max: 40
  },
  disability: {
    type: String,
    required: true,
    max: 40
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
