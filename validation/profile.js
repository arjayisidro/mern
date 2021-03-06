const isEmpty = require('./is-empty');
const Validator = require('validator');

module.exports = function validateProfileInput(data) {
  data.totalUnits = !isEmpty(data.totalUnits.toString())
    ? data.totalUnits.toString()
    : '';
  data.totalTuition = !isEmpty(data.totalTuition.toString())
    ? data.totalTuition.toString()
    : '';
  data.totalMisc = !isEmpty(data.totalMisc.toString())
    ? data.totalMisc.toString()
    : '';
  data.totalTuitionFee = !isEmpty(data.totalTuitionFee.toString())
    ? data.totalTuitionFee.toString()
    : '';

  data.admissionId = !isEmpty(data.admissionId) ? data.admissionId : '';
  data.studentName = !isEmpty(data.studentName) ? data.studentName : '';
  data.accountNo = !isEmpty(data.accountNo) ? data.accountNo : '';
  data.acadYear = !isEmpty(data.acadYear) ? data.acadYear : '';
  data.studentId = !isEmpty(data.studentId) ? data.studentId : '';
  data.studentType = !isEmpty(data.studentType) ? data.studentType : '';
  data.semester = !isEmpty(data.semester) ? data.semester : '';
  data.sex = !isEmpty(data.sex) ? data.sex : '';
  data.course = !isEmpty(data.course) ? data.course : '';
  data.major = !isEmpty(data.major) ? data.major : '';
  data.yearLevel = !isEmpty(data.yearLevel) ? data.yearLevel : '';

  let errors = {};

  for (const key in data) {
    if (typeof data[key] === 'boolean') {
      return {
        errors,
        isValid: isEmpty(errors)
      };
    }
    if (Validator.isEmpty(data[key])) {
      errors[key] = `This field is required.`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
