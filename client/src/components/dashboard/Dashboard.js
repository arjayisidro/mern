import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteCick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading, student } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <p
            className="lead text-muted"
            style={{ textTransform: 'capitalize' }}
          >
            Welcome, {user.name} !
          </p>
          <p>Enjoy using this Online system of Trece Martirez City College.</p>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="row">
          <div className="col-md-12">{dashboardContent}</div>
          {student && (
            <div>
              <div className="col-md-12 mb-4">Student Record</div>
              <div className="col-md-12">
                <table className="table text-left">
                  <thead className="thead-light">
                    <tr>
                      <th>Student ID</th>
                      <th>Last name</th>
                      <th>Given name</th>
                      <th>Middle name</th>
                      <th>Year level</th>
                      <th>Program Name</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{student.studentId || ''}</td>
                      <td>{student.lastName || ''}</td>
                      <td>{student.givenName || ''}</td>
                      <td>{student.middleName || ''}</td>
                      <td>{student.yearLevel || ''}</td>
                      <td>{student.completeProgramName || ''}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  student: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile,
  student: state.student,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
