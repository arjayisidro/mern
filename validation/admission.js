const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAdmissionInput(data) {
  let errors = {};

  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.middleName = !isEmpty(data.middleName) ? data.middleName : '';
  data.sex = !isEmpty(data.sex) ? data.sex : '';
  data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : '';
  data.civilStatus = !isEmpty(data.civilStatus) ? data.civilStatus : '';
  data.cellNumber = !isEmpty(data.cellNumber) ? data.cellNumber : '';
  data.religion = !isEmpty(data.religion) ? data.religion : '';
  data.bplace = !isEmpty(data.bplace) ? data.bplace : '';
  data.street = !isEmpty(data.street) ? data.street : '';
  data.barangay = !isEmpty(data.barangay) ? data.barangay : '';
  data.municipality = !isEmpty(data.municipality) ? data.municipality : '';
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : '';
  data.learnersPreference = !isEmpty(data.learnersPreference)
    ? data.learnersPreference
    : '';
  data.mothersLastName = !isEmpty(data.mothersLastName)
    ? data.mothersLastName
    : '';
  data.mothersFirstName = !isEmpty(data.mothersFirstName)
    ? data.mothersFirstName
    : '';
  data.mothersMiddleName = !isEmpty(data.mothersMiddleName)
    ? data.mothersMiddleName
    : '';
  data.occupation = !isEmpty(data.occupation) ? data.occupation : '';
  data.fathersFirstName = !isEmpty(data.fathersFirstName)
    ? data.fathersFirstName
    : '';
  data.fathersMiddleName = !isEmpty(data.fathersMiddleName)
    ? data.fathersMiddleName
    : '';
  data.fathersLastName = !isEmpty(data.fathersLastName)
    ? data.fathersLastName
    : '';
  data.fatherOccupation = !isEmpty(data.fatherOccupation)
    ? data.fatherOccupation
    : '';
  data.houseHoldIncome = !isEmpty(data.houseHoldIncome)
    ? data.houseHoldIncome
    : '';
  data.highSchool = !isEmpty(data.highSchool) ? data.highSchool : '';
  data.hsYearGraduated = !isEmpty(data.hsYearGraduated)
    ? data.hsYearGraduated
    : '';
  data.seniorHighSchool = !isEmpty(data.seniorHighSchool)
    ? data.seniorHighSchool
    : '';
  data.seniorYearGraduated = !isEmpty(data.seniorYearGraduated)
    ? data.seniorYearGraduated
    : '';
  data.college = !isEmpty(data.college) ? data.college : '';
  data.collegeYearGraduated = !isEmpty(data.collegeYearGraduated)
    ? data.collegeYearGraduated
    : '';
  data.courseMajor = !isEmpty(data.courseMajor) ? data.courseMajor : '';
  data.semesterSchoolYear = !isEmpty(data.semesterSchoolYear)
    ? data.semesterSchoolYear
    : '';
  data.requirements = !isEmpty(data.requirements) ? data.requirements : '';
  data.course1 = !isEmpty(data.course1) ? data.course1 : '';
  data.course2 = !isEmpty(data.course2) ? data.course2 : '';
  data.course3 = !isEmpty(data.course3) ? data.course3 : '';

  for (const key in data) {
    if (Validator.isEmpty(data[key])) {
      errors[key] = `This field is required.`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
