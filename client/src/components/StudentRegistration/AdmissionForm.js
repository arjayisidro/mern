import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createAdmission } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AdmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      middleName: '',
      sex: '',
      birthDate: '',
      civilStatus: '',
      cellNumber: '',
      religion: '',
      bplace: '',
      street: '',
      barangay: '',
      municipality: '',
      province: '',
      zipCode: '',
      learnersPreference: '',
      mothersLastName: '',
      mothersFirstName: '',
      mothersMiddleName: '',
      occupation: '',
      fathersFirstName: '',
      fathersMiddleName: '',
      fathersLastName: '',
      fatherOccupation: '',
      houseHoldIncome: '',
      highSchool: '',
      hsYearGraduated: '',
      seniorHighSchool: '',
      seniorYearGraduated: '',
      college: '',
      collegeYearGraduated: '',
      courseMajor: '',
      semesterSchoolYear: '',
      requirements: '',
      course1: '',
      course2: '',
      course3: '',
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, isLoading: false });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });

    const admissionData = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      sex: this.state.sex,
      birthDate: this.state.birthDate,
      civilStatus: this.state.civilStatus,
      cellNumber: this.state.cellNumber,
      religion: this.state.religion,
      bplace: this.state.bplace,
      street: this.state.street,
      barangay: this.state.barangay,
      municipality: this.state.municipality,
      province: this.state.province,
      zipCode: this.state.zipCode,
      learnersPreference: this.state.learnersPreference,
      mothersLastName: this.state.mothersLastName,
      mothersFirstName: this.state.mothersFirstName,
      mothersMiddleName: this.state.mothersMiddleName,
      occupation: this.state.occupation,
      fathersFirstName: this.state.fathersFirstName,
      fathersMiddleName: this.state.fathersMiddleName,
      fathersLastName: this.state.fathersLastName,
      fatherOccupation: this.state.fatherOccupation,
      houseHoldIncome: this.state.houseHoldIncome,
      highSchool: this.state.highSchool,
      hsYearGraduated: this.state.hsYearGraduated,
      seniorHighSchool: this.state.seniorHighSchool,
      seniorYearGraduated: this.state.seniorYearGraduated,
      college: this.state.college,
      collegeYearGraduated: this.state.collegeYearGraduated,
      courseMajor: this.state.courseMajor,
      semesterSchoolYear: this.state.semesterSchoolYear,
      requirements: this.state.requirements,
      course1: this.state.course1,
      course2: this.state.course2,
      course3: this.state.course3
    };

    this.props.createAdmission(admissionData, this.props.history);
    const { errors } = this.state;
    const { isSuccess } = this.props.profile;
    if (errors.admissionId) {
      toast.error(errors.admissionId, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }

    if (isSuccess) {
      toast.success(
        'Admission successfully!, Kindly Check your e-mail for confirmation',
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      );
    }
  }

  onClear(e) {
    e.preventDefault();
    this.setState({
      heiName: '',
      heiUUI: '',
      acadYear: '',
      studentId: '',
      emailAdd: '',
      lastName: '',
      firstName: '',
      middleName: '',
      sex: '',
      birthDate: '',
      completeProgramName: '',
      yearLevel: '',
      mothersLastName: '',
      mothersGivenName: '',
      mothersMiddleName: '',
      fathersLastName: '',
      fathersGivenName: '',
      fathersMiddleName: '',
      streetAndBarangay: '',
      townAndMunicipality: '',
      province: '',
      zipCode: '',
      totalAssesment: '',
      disability: '',
      errors: {}
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, isLoading } = this.state;

    const gender = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ];

    const courses = [
      { label: 'Bachelor in Education ', value: 'educ' },
      { label: 'Bachelor in Elementary Education ', value: 'elem_educ' },
      {
        label: 'Bachelor in Secondary Education Major in English ',
        value: 'major_english'
      },
      {
        label: 'Bachelor in Secondary Education Major in Mathematics',
        value: 'major_mathematics'
      },
      {
        label: 'Bachelor in Secondary Education Major in Filipino',
        value: 'major_filipino'
      },
      { label: 'Bachelor of Science in Criminology ', value: 'criminology' },
      { label: 'Bachelor of Science in Hospitality Management ', value: 'hrm' },
      { label: 'Bachelor of Sciece in Entrepreneuship', value: 'entre' },
      {
        label: 'Bachelor of Science in Custom Administration ',
        value: 'custom'
      },
      {
        label: 'Bachelor in Public Administration ',
        value: 'publicAdmin'
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <ToastContainer />
            <div className="col-md-12">
              <h2 className="display-5 text-left">Admission</h2>
              <small className="form-text text-italic text-left text-muted">
                Please read the instructions in the General Instructions tab of
                this template
              </small>
              <hr className="mb-6" />

              <form onSubmit={this.onSubmit}>
                <small className="text-muted">Student Information</small>
                <hr />
                <div className="row mb-4">
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Last name"
                      label="Last name:"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChange}
                      error={errors.lastName}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="First name"
                      label="First name:"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChange}
                      error={errors.firstName}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Middle name"
                      label="Middle name:"
                      name="middleName"
                      value={this.state.middleName}
                      onChange={this.onChange}
                      error={errors.middleName}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-2">
                    <SelectListGroup
                      placeholder="Gender"
                      label="Gender:"
                      name="sex"
                      value={this.state.sex}
                      onChange={this.onChange}
                      options={gender}
                      error={errors.sex}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Birthdate"
                      type="date"
                      label="Birthdate:"
                      name="birthDate"
                      value={this.state.birthDate}
                      onChange={this.onChange}
                      error={errors.birthDate}
                    />
                  </div>
                  <div className="col-md-2">
                    <TextFieldGroup
                      placeholder="Civil status"
                      label="Civil status:"
                      name="civilStatus"
                      value={this.state.civilStatus}
                      onChange={this.onChange}
                      error={errors.civilStatus}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Cellphone number"
                      label="Cellphone number:"
                      name="cellNumber"
                      value={this.state.cellNumber}
                      onChange={this.onChange}
                      error={errors.cellNumber}
                    />
                  </div>
                  <div className="col-md-2">
                    <TextFieldGroup
                      placeholder="Religion"
                      label="Religion:"
                      name="religion"
                      value={this.state.religion}
                      onChange={this.onChange}
                      error={errors.religion}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Birth Place"
                      label="Birth Place:"
                      name="bplace"
                      value={this.state.bplace}
                      onChange={this.onChange}
                      error={errors.bplace}
                    />
                  </div>
                </div>
                <small className="text-muted">Permanent Address</small>
                <hr />
                <div className="row mb-4">
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Street"
                      label="Street:"
                      name="street"
                      value={this.state.street}
                      onChange={this.onChange}
                      error={errors.street}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Brgy"
                      label="Brgy:"
                      name="barangay"
                      value={this.state.barangay}
                      onChange={this.onChange}
                      error={errors.barangay}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Municipality"
                      label="Municipality:"
                      name="municipality"
                      value={this.state.municipality}
                      onChange={this.onChange}
                      error={errors.municipality}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Province"
                      label="Province:"
                      name="province"
                      value={this.state.province}
                      onChange={this.onChange}
                      error={errors.province}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Zip Code"
                      label="Zip Code:"
                      name="zipCode"
                      value={this.state.zipCode}
                      onChange={this.onChange}
                      error={errors.zipCode}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Learners Preference #(LRN)"
                      label="Learners Preference #(LRN):"
                      name="learnersPreference"
                      value={this.state.learnersPreference}
                      onChange={this.onChange}
                      error={errors.learnersPreference}
                    />
                  </div>
                </div>
                <small className="text-muted">Mothers's Maiden name</small>
                <hr />
                <div className="row mb-4">
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Mother's Last name"
                      label="Mother's Last name:"
                      name="mothersLastName"
                      value={this.state.mothersLastName}
                      onChange={this.onChange}
                      error={errors.mothersLastName}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Mother's First name"
                      label="Mother's First name:"
                      name="mothersFirstName"
                      value={this.state.mothersFirstName}
                      onChange={this.onChange}
                      error={errors.mothersFirstName}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Mother's Middle name"
                      label="Mother's Middle name:"
                      name="mothersMiddleName"
                      value={this.state.mothersMiddleName}
                      onChange={this.onChange}
                      error={errors.mothersMiddleName}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Occupation"
                      label="Occupation:"
                      name="occupation"
                      value={this.state.occupation}
                      onChange={this.onChange}
                      error={errors.occupation}
                    />
                  </div>
                </div>
                <small className="text-muted">Fathers's name</small>
                <hr />
                <div className="row mb-4">
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Father's Last name"
                      label="Father's Last name:"
                      name="fathersLastName"
                      value={this.state.fathersLastName}
                      onChange={this.onChange}
                      error={errors.fathersLastName}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Father's First name"
                      label="Father's First name:"
                      name="fathersFirstName"
                      value={this.state.fathersFirstName}
                      onChange={this.onChange}
                      error={errors.fathersFirstName}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Father's Middle name"
                      label="Father's Middle name:"
                      name="fathersMiddleName"
                      value={this.state.fathersMiddleName}
                      onChange={this.onChange}
                      error={errors.fathersMiddleName}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Occupation"
                      label="Occupation:"
                      name="fatherOccupation"
                      value={this.state.fatherOccupation}
                      onChange={this.onChange}
                      error={errors.fatherOccupation}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Household Income per month"
                      label="Household Income per month:"
                      name="houseHoldIncome"
                      value={this.state.houseHoldIncome}
                      onChange={this.onChange}
                      error={errors.houseHoldIncome}
                    />
                  </div>
                </div>
                <small className="text-muted">Educational Information</small>
                <hr />
                <div className="row mb-4">
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="High School"
                      label="High School:"
                      name="highSchool"
                      value={this.state.highSchool}
                      onChange={this.onChange}
                      error={errors.highSchool}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Year Graduated"
                      label="Year Graduated:"
                      name="hsYearGraduated"
                      value={this.state.hsYearGraduated}
                      onChange={this.onChange}
                      error={errors.hsYearGraduated}
                    />
                  </div>

                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="SHS(Senior HighSchool)"
                      label="SHS(Senior HighSchool):"
                      name="seniorHighSchool"
                      value={this.state.seniorHighSchool}
                      onChange={this.onChange}
                      error={errors.seniorHighSchool}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Year Graduated"
                      label="Year Graduated:"
                      name="seniorYearGraduated"
                      value={this.state.seniorYearGraduated}
                      onChange={this.onChange}
                      error={errors.seniorYearGraduated}
                    />
                  </div>

                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="College/University"
                      label="College/University(if admitted to previous HEIS):"
                      name="college"
                      value={this.state.college}
                      onChange={this.onChange}
                      error={errors.college}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Year Graduated"
                      label="Year Graduated:"
                      name="collegeYearGraduated"
                      value={this.state.collegeYearGraduated}
                      onChange={this.onChange}
                      error={errors.collegeYearGraduated}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Course/Major"
                      label="Course/Major:"
                      name="courseMajor"
                      value={this.state.courseMajor}
                      onChange={this.onChange}
                      error={errors.courseMajor}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Semester/ School year"
                      label="Semester / School year Last Attended:"
                      name="semesterSchoolYear"
                      value={this.state.semesterSchoolYear}
                      onChange={this.onChange}
                      error={errors.semesterSchoolYear}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Available Requirements"
                      label="Available Requirements"
                      name="requirements"
                      value={this.state.requirements}
                      onChange={this.onChange}
                      error={errors.requirements}
                    />
                  </div>
                  <div className="col-md-7">
                    <SelectListGroup
                      options={courses}
                      placeholder="Preferred Course"
                      label="Preferred Course"
                      name="course1"
                      value={this.state.course1}
                      onChange={this.onChange}
                      error={errors.course1}
                    />
                  </div>
                  <div className="col-md-7">
                    <SelectListGroup
                      options={courses}
                      placeholder="Preferred Course 2"
                      label="Preferred Course 2"
                      name="course2"
                      value={this.state.course2}
                      onChange={this.onChange}
                      error={errors.course2}
                    />
                  </div>
                  <div className="col-md-7">
                    <SelectListGroup
                      options={courses}
                      placeholder="Preferred Course 3"
                      label="Preferred Course 3"
                      name="course3"
                      value={this.state.course3}
                      onChange={this.onChange}
                      error={errors.course3}
                    />
                  </div>
                </div>

                {Object.keys(errors).length > 0 &&
                  (!errors.admissionId && (
                    <div
                      style={{
                        width: '100%',
                        marginTop: '.25rem',
                        fontSize: '80%',
                        color: '#dc3545'
                      }}
                    >
                      Please complete the required fields.
                    </div>
                  ))}
                <div className="row">
                  <div className="col-md-3 mt-4">
                    <button
                      style={{ width: '100%' }}
                      className="btn btn-secondary float-right"
                      onClick={event => this.onClear(event)}
                    >
                      Clear
                    </button>
                  </div>

                  <div className="col-md-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4 float-right"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdmissionForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createAdmission }
)(withRouter(AdmissionForm));
