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

class RegisterPrinted extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const { registeredData } = this.props.profile;

    return (
      <div className="registered-printed">
        <div className="container">
          <div className="row">
            <div className="mb5">
              <button
                className="btn btn-outline-info mb-4"
                onClick={this.printDocument}
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
                    STUDENT NAME:{' '}
                    {registeredData ? registeredData.studentName : ''}
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    STUDENT NO. {registeredData ? registeredData.studentId : ''}
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    COURSE {registeredData ? registeredData.course : ''}
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    STUDENT TYPE{' '}
                    {registeredData ? registeredData.studentType : ''}
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    MAJOR {registeredData ? registeredData.major : ''}
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    GENDER {registeredData ? registeredData.sex : ''}
                  </div>

                  <div className="col-md-12 ml-4 mt-2">
                    LEVEL {registeredData ? registeredData.yearLevel : ''}
                  </div>
                </div>
                <hr className="mb-4 mt-4"></hr>
                <div className="col-md-12">
                  <table className="table table-border ml-auto">
                    <thead>
                      <tr>
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
                      <tr>
                        {registeredData
                          ? registeredData.subjects.map(subject => (
                              <React.Fragment>
                                <td>{subject.subjectCode || ''}</td>
                                <td>{subject.description || ''}</td>
                                <td>{subject.units || ''}</td>
                                <td>{subject.day || ''}</td>
                                <td>{subject.time || ''}</td>
                                <td>{subject.room || ''}</td>
                                <td>{subject.section || ''}</td>
                              </React.Fragment>
                            ))
                          : ''}
                      </tr>
                      <tr>
                        <td></td>
                        <td className="text-right">Total Units</td>
                        <td>
                          {registeredData ? registeredData.totalUnits : ''}
                        </td>
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
                        {`TUITION FEE ${
                          registeredData ? registeredData.totalTuition : ''
                        }` || ''}
                      </div>
                      <div className="col-md-12 mt-4">
                        {`MISCELLANEOUS FEE ${
                          registeredData ? registeredData.totalMisc : ''
                        }` || ''}
                      </div>
                      <div className="col-md-12 mt-4">
                        {`TOTAL TUITION FEE ${
                          registeredData ? registeredData.totalTuitionFee : ''
                        }` || ''}
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
  profile: PropTypes.object.isRequired
};

RegisterPrinted.defaultProps = {
  registeredData: [{}]
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(withRouter(RegisterPrinted));
