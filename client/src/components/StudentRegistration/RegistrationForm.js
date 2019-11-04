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
      studentName: '',
      accountNo: '',
      acadYear: '',
      studentId: '',
      studentType: '',
      semester: '',
      sex: '',
      course: '',
      major: '',
      yearLevel: '',
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
      studentName: this.state.studentName,
      accountNo: this.state.accountNo,
      acadYear: this.state.acadYear,
      studentId: this.state.studentId,
      studentType: this.state.studentType,
      semester: this.state.semester,
      sex: this.state.sex,
      course: this.state.course,
      major: this.state.major,
      yearLevel: this.state.yearLevel
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onClear(e) {
    e.preventDefault();
    this.setState({
      studentName: '',
      accountNo: '',
      acadYear: '',
      studentId: '',
      studentType: '',
      semester: '',
      sex: '',
      course: '',
      major: '',
      yearLevel: '',
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
              <h2 className="display-5 text-left">Registration</h2>
              <small className="form-text text-italic text-left text-muted">
                Please read the instructions in the General Instructions tab of
                this template
              </small>
              <hr className="mb-6" />

              <form onSubmit={this.onSubmit}>
                <div className="row mb-4">
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Student name"
                      label="Student name:"
                      name="studentName"
                      value={this.state.studentName}
                      onChange={this.onChange}
                      error={errors.studentName}
                    />
                  </div>
                  <div className="col-md-4" />
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Account #"
                      label="Account #:"
                      name="accountNo"
                      value={this.state.accountNo}
                      onChange={this.onChange}
                      error={errors.accountNo}
                    />
                  </div>
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
                  <div className="col-md-4" />
                  <div className="col-md-4">
                    <SelectListGroup
                      placeholder="Academic Year"
                      name="acadYear"
                      label="Academic Year:"
                      value={this.state.acadYear}
                      onChange={this.onChange}
                      options={options}
                      error={errors.acadYear}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Student Type"
                      label="Student Type:"
                      name="studentType"
                      value={this.state.studentType}
                      onChange={this.onChange}
                      error={errors.studentType}
                      type="email"
                    />
                  </div>
                  <div className="col-md-4" />
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Semester"
                      label="Semester:"
                      name="semester"
                      value={this.state.semester}
                      onChange={this.onChange}
                      error={errors.semester}
                      type="email"
                    />
                  </div>
                  <div className="col-md-4">
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
                  <div className="col-md-8" />
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Course"
                      label="Course:"
                      name="course"
                      value={this.state.course}
                      onChange={this.onChange}
                      error={errors.course}
                      type="email"
                    />
                  </div>
                  <div className="col-md-8" />
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Major"
                      label="Major:"
                      name="major"
                      value={this.state.major}
                      onChange={this.onChange}
                      error={errors.major}
                      type="email"
                    />
                  </div>
                  <div className="col-md-8" />
                  <div className="col-md-4">
                    <TextFieldGroup
                      placeholder="Year Level"
                      label="Year Level:"
                      name="yearLevel"
                      value={this.state.yearLevel}
                      onChange={this.onChange}
                      error={errors.yearLevel}
                      type="email"
                    />
                  </div>
                  <div className="col-md-8" />
                </div>

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject Description</th>
                      <th>Units</th>
                      <th>Day</th>
                      <th>Time</th>
                      <th>Room</th>
                      <th>Section</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <p className="font-weight-bold mt-4">MISC / Tuition Fees</p>
                <p>
                  <small>Total load Units: </small>
                </p>
                <p>
                  <small>Tuition Fees: </small>
                </p>
                <p>
                  <small>Miscellaneous Fee: </small>
                </p>
                <p>Total Tuition Fee: </p>

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
