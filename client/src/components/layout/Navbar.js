import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { LogoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.LogoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown mr-4">
            <a
              className="nav-link dropdown-toggle font-weight-bold text-white"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Administration
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/registration-form">
                Register a Student
              </Link>
              <Link className="dropdown-item" to="/schedule-exam">
                Schedule for Exam
              </Link>

              <a className="dropdown-item" href="#">
                Schedule for Requirements
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Search for Student
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link font-weight-bold text-white"
            >
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                style={{ width: '25px', marginRight: '5px' }}
                title="You must have a gravatar connected to your email to display an image."
              />
              {''}
              Logout
            </a>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link font-weight-bold text-white" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-success bg-success mb-4">
        <div className="container">
          <div className="collapse navbar-collapse">
            <Link
              className="navbar-brand font-weight-bold text-white"
              style={{ paddingBottom: '10px' }}
              to="/"
            >
              Home
            </Link>

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
            {isAuthenticated && (
              <form className="form-inline my-2 my-lg-12">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search for student..."
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-light my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            )}
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
  { LogoutUser, clearCurrentProfile }
)(Navbar);
