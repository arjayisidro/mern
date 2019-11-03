import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { LogoutUser } from '../../actions/authActions';
import {
  clearCurrentProfile,
  searchByStudentId
} from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.LogoutUser();
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.searchByStudentId(this.state.searchField);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const isStudent = user.role === 1;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        {!isStudent && (
          <li className="form-inline nav-item dropdown mr-4">
            <a
              className="nav-link dropdown-toggle font-weight-bold text-white"
              style={{ marginRight: '100px' }}
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {isStudent ? 'Student Admission' : 'Admission'}
            </a>
            {!isStudent && (
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="/registration-form">
                  Register a Student
                </Link>
                <Link className="dropdown-item" to="/admission-registered">
                  Registered Admission Students
                </Link>
                <Link className="dropdown-item" to="/student-list">
                  Student Master List
                </Link>
              </div>
            )}
          </li>
        )}

        <li className="nav-item dropdown" style={{ marginTop: '5px' }}>
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link font-weight-bold text-white"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{
                width: '25px',
                marginRight: '5px'
              }}
              title="You must have a gravatar connected to your email to display an image."
            />
            {''}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link font-weight-bold text-white" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link font-weight-bold text-white" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg bg-success mb-4">
        <div className="container">
          <div className="collapse navbar-collapse">
            <Link
              className="navbar-brand font-weight-bold text-white"
              style={{ paddingBottom: '10px', marginRight: '5%' }}
              to="/"
            >
              Home
            </Link>
            {isStudent && (
              <Link
                className="navbar-brand font-weight-bold mr-4 text-white"
                style={{ paddingBottom: '10px' }}
                to="/admission-form"
              >
                Admission
              </Link>
            )}

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  LogoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { LogoutUser, clearCurrentProfile, searchByStudentId }
)(Navbar);
