const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateProfileInput(data) {
  data.heiName = !isEmpty(data.heiName) ? data.heiName : '';
  data.heiUUI = !isEmpty(data.heiUUI) ? data.heiUUI : '';
  data.acadYear = !isEmpty(data.acadYear) ? data.acadYear : '';
  data.studentId = !isEmpty(data.studentId) ? data.studentId : '';
  data.emailAdd = !isEmpty(data.emailAdd) ? data.emailAdd : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.givenName = !isEmpty(data.givenName) ? data.givenName : '';
  data.middleName = !isEmpty(data.middleName) ? data.middleName : '';
  data.sex = !isEmpty(data.sex) ? data.sex : '';

  data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : '';
  data.completeProgramName = !isEmpty(data.completeProgramName)
    ? data.completeProgramName
    : '';
  data.yearLevel = !isEmpty(data.yearLevel) ? data.yearLevel : '';
  data.mothersLastName = !isEmpty(data.mothersLastName)
    ? data.mothersLastName
    : '';
  data.mothersGivenName = !isEmpty(data.mothersGivenName)
    ? data.mothersGivenName
    : '';
  data.mothersMiddleName = !isEmpty(data.mothersMiddleName)
    ? data.mothersMiddleName
    : '';
  data.fathersLastName = !isEmpty(data.fathersLastName)
    ? data.fathersLastName
    : '';
  data.fathersGivenName = !isEmpty(data.fathersGivenName)
    ? data.fathersGivenName
    : '';
  data.fathersMiddleName = !isEmpty(data.fathersMiddleName)
    ? data.fathersMiddleName
    : '';
  data.streetAndBarangay = !isEmpty(data.streetAndBarangay)
    ? data.streetAndBarangay
    : '';
  data.townAndMunicipality = !isEmpty(data.townAndMunicipality)
    ? data.townAndMunicipality
    : '';
  data.province = !isEmpty(data.province) ? data.province : '';
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : '';
  data.totalAssesment = !isEmpty(data.totalAssesment)
    ? data.totalAssesment
    : '';
  data.disability = !isEmpty(data.disability) ? data.disability : '';
  let errors = {};

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
