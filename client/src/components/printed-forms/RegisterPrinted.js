import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getAllRegisteredAdmission } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import logo from '../../img/logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getAllStudents } from '../../actions/profileActions';

class RegisterPrinted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredDataState: {}
    };
  }

  componentDidMount() {
    this.props.getAllStudents();
    const { registeredData } = this.props.profile;
    const { id } = this.props.match.params;
    if (registeredData && !id) {
      this.setState({ registeredDataState: registeredData });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { students } = nextProps.students;
    const { id } = this.props.match.params;
    if (students && students.length > 0) {
      const data = students.find(x => x._id === id);
      this.setState({ registeredDataState: data });
    }
  }

  printDocument(registeredData) {
    const studentId = registeredData ? registeredData.studentId : '';
    var pdf = new jsPDF('l', 'mm', [500, 400]);
    pdf.addHTML(document.getElementById('divToPrint'), function() {
      pdf.save(`${studentId}.pdf`);
    });
  }

  render() {
    const { registeredDataState } = this.state;
    console.log(registeredDataState);

    return (
      <div className="registered-printed">
        <div className="container">
          <div className="row">
            <div className="mb5">
              <button
                className="btn btn-outline-info mb-4"
                onClick={() => this.printDocument(registeredDataState)}
              >
                Download
              </button>
            </div>
            <div className="card mb-3" id="divToPrint">
              <div className="row no-gutters">
                <div className="col-md-1" />
                <div className="col-md-2">
                  <img src={logo} class="card-img" alt="logo" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h1 className="card-title">TRECE MARTIREZ CITY COLLEGE</h1>
                    <p className="card-text text-center">
                      Trece-Indang Rd., Brgy. Luciano Trece Martires City,
                      Cavite
                    </p>
                    <h4 className="text-center">CERTIFICATE OF ENROLLMENT</h4>
                  </div>
                </div>
                <hr className="mt-4" />
                <div className="row mb-4">
                  <div className="col-md-12 ml-4 mt-4">
                    <div className="row">
                      <div className="col-md-3">STUDENT NAME: </div>
                      <div className="col-md-6">
                        {registeredDataState.studentName}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    <div className="row">
                      <div className="col-md-3">STUDENT NO:</div>
                      <div className="col-md-6">
                        {registeredDataState.studentId}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    <div className="row">
                      <div className="col-md-3">COURSE:</div>
                      <div className="col-md-6">
                        {registeredDataState.course}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    <div className="row">
                      <div className="col-md-3">STUDENT TYPE: </div>
                      <div className="col-md-6">
                        {registeredDataState.studentType}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    <div className="row">
                      <div className="col-md-3">MAJOR:</div>
                      <div className="col-md-6">
                        {registeredDataState.major}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    <div className="row">
                      <div className="col-md-3">GENDER:</div>
                      <div className="col-md-6">{registeredDataState.sex}</div>
                    </div>
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    <div className="row">
                      <div className="col-md-3">LEVEL:</div>
                      <div className="col-md-6">
                        {registeredDataState.yearLevel}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mb-4 mt-4"></hr>
                <div className="col-md-12">
                  <table className="table table-border ml-auto">
                    <thead>
                      <tr className="text-center">
                        <th>CODE</th>
                        <th>DESCRIPTION</th>
                        <th>UNIT</th>
                        <th>DAY</th>
                        <th>TIME</th>
                        <th>ROOM</th>
                        <th>SECTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registeredDataState.subjects &&
                        registeredDataState.subjects.map(subject => (
                          <tr className="text-center">
                            <td>{subject.subjectCode || ''}</td>
                            <td>{subject.description || ''}</td>
                            <td>{subject.units || ''}</td>
                            <td>{subject.day || ''}</td>
                            <td>{subject.time || ''}</td>
                            <td>{subject.room || ''}</td>
                            <td>{subject.section || ''}</td>
                          </tr>
                        ))}
                      <tr className="text-center">
                        <td></td>
                        <td className="text-right">Total Units</td>
                        <td>{registeredDataState.totalUnits}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="col-md-6 mb-4">
                    <h5 className="text-center">{`>> TUITION FEES <<`}</h5>
                    <div className="card p-2">
                      <div className="col-md-12 mt-4">
                        <div className="row">
                          <div className="col-md-6">TUITION FEE:</div>
                          <div className="col-md-6">
                            {registeredDataState.totalTuition}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mt-4">
                        <div className="row">
                          <div className="col-md-6">MISCELLANEOUS FEE:</div>
                          <div className="col-md-6">
                            {registeredDataState.totalMisc}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mt-4">
                        <div className="row">
                          <div className="col-md-6">TOTAL TUITION FEE:</div>
                          <div className="col-md-6">
                            {registeredDataState.totalTuitionFee}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mt-4">RA 10931</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterPrinted.propTypes = {
  profile: PropTypes.object.isRequired,
  students: PropTypes.array
};

RegisterPrinted.defaultProps = {
  registeredData: [{}]
};

const mapStateToProps = state => ({
  profile: state.profile,
  students: state.students
});

export default connect(
  mapStateToProps,
  { getAllStudents }
)(withRouter(RegisterPrinted));
