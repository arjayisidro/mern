import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPrinted from '../printed-forms/RegisterPrinted';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admissionId: '',
      studentName: '',
      accountNo: '',
      acadYear: '',
      studentId: '',
      studentType: '',
      status: '',
      semester: '',
      sex: '',
      course: '',
      major: '',
      yearLevel: '',
      errors: {},
      isDownload: false,
      subjects: [
        {
          subjectCode: '',
          description: '',
          units: '',
          day: '',
          time: '',
          room: '',
          section: ''
        }
      ],
      totalUnits: '0',
      totalTuition: '0',
      totalMisc: '5000',
      totalTuitionFee: '5000',
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save('download.pdf');
    });
  }

  componentDidMount() {
    if (this.props.location.state) {
      const {
        firstName,
        lastName,
        middleName,
        sex,
        admissionId
      } = this.props.location.state;
      this.setState({
        admissionId: admissionId,
        studentName: `${lastName}, ${firstName} ${middleName}`,
        sex: sex
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, isLoading: false });
    }
    const data = nextProps.profile.registeredData;
    console.log(data);
    const studentId = data && data._id;

    if (this.props.profile.isRegister) {
      const Msg = ({ closeToast }) => (
        <div>
          <div
            className="card bg-success"
            style={{ width: '18rem', border: 'none', borderStyle: 'none' }}
          >
            <div className="card-body">
              <h5 className="card-title font-weight-bold">
                Registration Successfully!
              </h5>
              <Link
                className="text-white"
                to={`/registered-printed/${studentId}`}
              >
                Please download your registration form here.
              </Link>
            </div>
          </div>
        </div>
      );

      toast.success(<Msg />, {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false
      });
    }
  }

  addClick() {
    this.setState(prevState => ({
      subjects: [
        ...prevState.subjects,
        {
          subjectCode: '',
          description: '',
          units: '',
          day: '',
          time: '',
          room: '',
          section: ''
        }
      ]
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });

    const profileData = {
      admissionId: this.state.admissionId,
      studentName: this.state.studentName,
      accountNo: this.state.accountNo,
      acadYear: this.state.acadYear,
      studentId: this.state.studentId,
      studentType: this.state.studentType,
      status: this.state.status,
      semester: this.state.semester,
      sex: this.state.sex,
      course: this.state.course,
      major: this.state.major,
      yearLevel: this.state.yearLevel,
      totalUnits: this.state.totalUnits,
      totalTuition: this.state.totalTuition,
      totalMisc: this.state.totalMisc,
      totalTuitionFee: this.state.totalTuitionFee,
      subjects: JSON.stringify(this.state.subjects)
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onClear(e) {
    e.preventDefault();
    this.setState({
      admissionId: '',
      studentName: '',
      accountNo: '',
      acadYear: '',
      studentId: '',
      studentType: '',
      status: '',
      semester: '',
      sex: '',
      course: '',
      major: '',
      yearLevel: '',
      totalUnits: '0',
      totalTuition: '0',
      totalMisc: '5000',
      totalTuitionFee: '5000',
      errors: {}
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  subjectOnChange(i, e) {
    const { name, value } = e.target;
    let subjects = [...this.state.subjects];
    subjects[i] = { ...subjects[i], [name]: value };
    this.setState({ subjects });
    let result = [
      this.state.subjects.reduce((acc, n) => {
        for (var prop in n) {
          if (acc.hasOwnProperty(prop)) acc[prop] = +acc[prop] + +n[prop];
          else acc[prop] = n[prop];
        }
        return acc;
      }, {})
    ];
    let totalUnits = result[0].units;
    let totalTuition = result[0].units * 100;
    let totalMisc = 5000;
    let totalTuitionFee = +totalTuition + +totalMisc;

    this.setState({
      totalUnits: totalUnits,
      totalTuition: totalTuition,
      totalMisc: totalMisc,
      totalTuitionFee: totalTuitionFee
    });
  }

  removeClick(i) {
    let subjects = [...this.state.subjects];
    subjects.splice(i, 1);
    this.setState({ subjects });
  }

  render() {
    const { errors, isLoading } = this.state;
    const { isRegister } = this.props.profile;

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

    const studentTypeOptions = [
      { label: 'Irregular', value: 'irregular' },
      { label: 'Regular', value: 'regular' },
      { label: 'Transferee', value: 'transferee' },
      { label: 'Freshman', value: 'freshman' }
    ];

    const statusOptions = [
      { label: 'New', value: 'new' },
      { label: 'Old', value: 'old' }
    ];

    const gender = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <ToastContainer closeButton={<span></span>} />
            <div className="col-md-12">
              <h2 className="display-5 text-left">Registration</h2>
              <hr className="mb-6" />

              <form onSubmit={this.onSubmit}>
                <div className="row mb-4">
                  <div className="col-md-4">
                    {this.state.admissionId ? (
                      <label className="mt-4 mb-4">
                        <strong>Admission Id:</strong> {this.state.admissionId}
                      </label>
                    ) : (
                      <TextFieldGroup
                        placeholder="Admission ID"
                        label="Admission ID:"
                        name="admissionId"
                        value={this.state.admissionId}
                        onChange={this.onChange}
                        error={errors.admissionId}
                      />
                    )}
                  </div>
                  <div className="col-md-8" />
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
                    <SelectListGroup
                      placeholder="Student Type"
                      name="studentType"
                      label="Student Type:"
                      value={this.state.studentType}
                      onChange={this.onChange}
                      error={errors.studentType}
                      value={this.state.studentType}
                      onChange={this.onChange}
                      options={studentTypeOptions}
                      error={errors.studentType}
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
                    />
                  </div>
                  <div className="col-md-4">
                    <SelectListGroup
                      placeholder="Status"
                      name="status"
                      label="Status:"
                      value={this.state.status}
                      onChange={this.onChange}
                      error={errors.status}
                      value={this.state.status}
                      onChange={this.onChange}
                      options={statusOptions}
                      error={errors.status}
                    />
                  </div>
                  <div className="col-md-8" />
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
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.subjects.map((val, id) => (
                      <tr key={id}>
                        <td>
                          <TextFieldGroup
                            placeholder="Subject code"
                            label="Subject code:"
                            name="subjectCode"
                            value={val.subjectCode || ''}
                            onChange={this.subjectOnChange.bind(this, id)}
                          />
                        </td>
                        <td>
                          <TextFieldGroup
                            placeholder="Description"
                            label="Description:"
                            name="description"
                            value={val.description || ''}
                            onChange={this.subjectOnChange.bind(this, id)}
                          />
                        </td>
                        <td>
                          <TextFieldGroup
                            type="number"
                            placeholder="Units"
                            label="Units:"
                            name="units"
                            value={val.units || ''}
                            onChange={this.subjectOnChange.bind(this, id)}
                          />
                        </td>
                        <td>
                          <TextFieldGroup
                            placeholder="Day"
                            label="Day:"
                            name="day"
                            value={val.day || ''}
                            onChange={this.subjectOnChange.bind(this, id)}
                          />
                        </td>
                        <td>
                          <TextFieldGroup
                            placeholder="Time"
                            label="Time:"
                            name="time"
                            value={val.time || ''}
                            onChange={this.subjectOnChange.bind(this, id)}
                          />
                        </td>
                        <td>
                          <TextFieldGroup
                            placeholder="Room"
                            label="Room:"
                            name="room"
                            value={val.room || ''}
                            onChange={this.subjectOnChange.bind(this, id)}
                          />
                        </td>
                        <td>
                          <TextFieldGroup
                            placeholder="Section"
                            label="Section:"
                            name="section"
                            value={val.section || ''}
                            onChange={this.subjectOnChange.bind(this, id)}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger mt-4"
                            onClick={this.removeClick.bind(this, id)}
                            type="button"
                          >
                            {' '}
                            <i class="fa fa-trash-o fa-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="btn btn-outline-info"
                  onClick={this.addClick.bind(this)}
                  type="button"
                >
                  {' '}
                  Add more Subject
                </button>

                <p className="font-weight-bold mt-4">MISC / Tuition Fees</p>
                <div className="row">
                  <div className="col-md-2">
                    <small>Total load Units: </small>
                  </div>
                  <div className="col-md-4">
                    <small>{this.state.totalUnits}</small>
                  </div>
                  <div className="col-md-6" />
                  <div className="col-md-2">
                    <small>Tuition Fees: </small>
                  </div>
                  <div className="col-md-4">
                    <small>
                      {this.state.totalTuition
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                    </small>
                  </div>
                  <div className="col-md-6" />
                  <div className="col-md-2">
                    <small>Miscellaneous Fee: </small>
                  </div>
                  <div className="col-md-4">
                    <small>{this.state.totalMisc}</small>
                  </div>
                  <div className="col-md-6" />
                  <div className="col-md-2">
                    <small>Total Tuition Fee: </small>
                  </div>
                  <div className="col-md-4">
                    <small>{this.state.totalTuitionFee}</small>
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

export default connect(mapStateToProps, { createProfile })(
  withRouter(RegistrationForm)
);
