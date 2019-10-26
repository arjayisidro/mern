import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heiName: '',
      heiUUI: '',
      acadYear: '',
      studentId: '',
      emailAdd: '',
      lastName: '',
      givenName: '',
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

    const profileData = {
      heiName: this.state.heiName,
      heiUUI: this.state.heiUUI,
      acadYear: this.state.acadYear,
      studentId: this.state.studentId,
      emailAdd: this.state.emailAdd,
      lastName: this.state.lastName,
      givenName: this.state.givenName,
      middleName: this.state.middleName,
      sex: this.state.sex,
      birthDate: this.state.birthDate,
      completeProgramName: this.state.completeProgramName,
      yearLevel: this.state.yearLevel,
      mothersLastName: this.state.mothersLastName,
      mothersGivenName: this.state.mothersGivenName,
      mothersMiddleName: this.state.mothersMiddleName,
      fathersLastName: this.state.fathersLastName,
      fathersGivenName: this.state.fathersGivenName,
      fathersMiddleName: this.state.fathersMiddleName,
      streetAndBarangay: this.state.streetAndBarangay,
      townAndMunicipality: this.state.townAndMunicipality,
      province: this.state.province,
      zipCode: this.state.zipCode,
      totalAssesment: this.state.totalAssesment,
      disability: this.state.disability
    };

    this.props.createProfile(profileData, this.props.history);
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
      givenName: '',
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

    const options = [
      { label: '2015-2016', value: '2015-2016' },
      { label: '2017-2018', value: '2017-2018' },
      { label: '2018-2019', value: '2018-2019' },
      { label: '2019-2020', value: '2019-2020' },
      { label: '2020-2021', value: '2020-2021' },
      { label: '2021-2022', value: '2021-2022' },
      { label: '2022-2023', value: '2022-2023' },
      { label: '2023-2024', value: '2023-2024' },
      { label: '2024-2025', value: '2024-2025' }
    ];

    const gender = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-5 text-left">Student Registration</h2>
              <small className="form-text text-italic text-left text-muted">
                Please read the instructions in the General Instructions tab of
                this template
              </small>
              <hr className="mb-6" />

              <form onSubmit={this.onSubmit}>
                <div className="row mb-4">
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Student id"
                      label="Student id:"
                      name="studentId"
                      value={this.state.studentId}
                      onChange={this.onChange}
                      error={errors.studentId}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Email Address"
                      label="Email Address:"
                      name="emailAdd"
                      value={this.state.emailAdd}
                      onChange={this.onChange}
                      error={errors.emailAdd}
                      type="email"
                    />
                  </div>
                </div>
                <small className="text-muted">Student Information</small>
                <hr className="mb-6" />
                <div className="row mb-4">
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="HEI UII"
                      label="HEI UII:"
                      name="heiUUI"
                      value={this.state.heiUUI}
                      onChange={this.onChange}
                      error={errors.heiUUI}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="HEI Name"
                      label="HEI Name:"
                      name="heiName"
                      value={this.state.heiName}
                      onChange={this.onChange}
                      error={errors.heiName}
                    />
                  </div>

                  <div className="col-md-4">
                    <SelectListGroup
                      placeholder="ACAD Year"
                      name="acadYear"
                      label="ACAD Year:"
                      value={this.state.acadYear}
                      onChange={this.onChange}
                      options={options}
                      error={errors.acadYear}
                    />
                  </div>
                </div>
                <small className="text-muted">Personal Information</small>
                <hr className="mb-6" />
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
                      placeholder="Given name"
                      label="Given name:"
                      name="givenName"
                      value={this.state.givenName}
                      onChange={this.onChange}
                      error={errors.givenName}
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
                <small className="text-muted">Student Data</small>
                <hr className="mb-6" />
                <div className="row mb-4">
                  <div className="col-md-3">
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
                      label="Birthdate:"
                      name="birthDate"
                      value={this.state.birthDate}
                      onChange={this.onChange}
                      error={errors.birthDate}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Complete program name"
                      label="Complete program name:"
                      name="completeProgramName"
                      value={this.state.completeProgramName}
                      onChange={this.onChange}
                      error={errors.completeProgramName}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Year level"
                      label="Year level:"
                      name="yearLevel"
                      value={this.state.yearLevel}
                      onChange={this.onChange}
                      error={errors.yearLevel}
                    />
                  </div>
                </div>
                <small className="text-muted">Father's information</small>
                <hr className="mb-6" />
                <div className="row mb-4">
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Lastname"
                      label="Lastname:"
                      name="fathersLastName"
                      value={this.state.fathersLastName}
                      onChange={this.onChange}
                      error={errors.fathersLastName}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Given name"
                      label="Given name:"
                      name="fathersGivenName"
                      value={this.state.fathersGivenName}
                      onChange={this.onChange}
                      error={errors.fathersGivenName}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Middle name"
                      label="Middle name:"
                      name="fathersMiddleName"
                      value={this.state.fathersMiddleName}
                      onChange={this.onChange}
                      error={errors.fathersMiddleName}
                    />
                  </div>
                </div>
                <small className="text-muted">Mothers's information</small>
                <hr className="mb-6" />
                <div className="row mb-4">
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Lastname"
                      label="Lastname:"
                      name="mothersLastName"
                      value={this.state.mothersLastName}
                      onChange={this.onChange}
                      error={errors.mothersLastName}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Given name"
                      label="Given name:"
                      name="mothersGivenName"
                      value={this.state.mothersGivenName}
                      onChange={this.onChange}
                      error={errors.mothersGivenName}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Middle name"
                      label="Middle name:"
                      name="mothersMiddleName"
                      value={this.state.mothersMiddleName}
                      onChange={this.onChange}
                      error={errors.mothersMiddleName}
                    />
                  </div>
                </div>
                <small className="text-muted">Permanent Address</small>
                <hr className="mb-6" />
                <div className="row mb-4">
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="STREET / BARANGAY"
                      label="STREET / BARANGAY:"
                      name="streetAndBarangay"
                      value={this.state.streetAndBarangay}
                      onChange={this.onChange}
                      error={errors.streetAndBarangay}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="TOWN/CITY/MUNICIPALITY"
                      label="TOWN/CITY/MUNICIPALITY:"
                      name="townAndMunicipality"
                      value={this.state.townAndMunicipality}
                      onChange={this.onChange}
                      error={errors.townAndMunicipality}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="PROVINCE"
                      label="PROVINCE:"
                      name="province"
                      value={this.state.province}
                      onChange={this.onChange}
                      error={errors.province}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextFieldGroup
                      placeholder="Zipcode"
                      label="Zipcode:"
                      name="zipCode"
                      value={this.state.zipCode}
                      onChange={this.onChange}
                      error={errors.zipCode}
                    />
                  </div>
                </div>

                <small className="text-muted">Others</small>
                <hr className="mb-6" />
                <div className="row">
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="Total Assesment"
                      label="Total Assesment:"
                      name="totalAssesment"
                      value={this.state.totalAssesment}
                      onChange={this.onChange}
                      error={errors.totalAssesment}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup
                      placeholder="DISABILITY"
                      label="DISABILITY:"
                      name="disability"
                      value={this.state.disability}
                      onChange={this.onChange}
                      error={errors.disability}
                    />
                  </div>
                </div>
                {Object.keys(errors).length > 0 && (
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
                )}
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

RegistrationForm.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(RegistrationForm));
