import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="jumbotron bg-light">
          <div className="container">
            <h1 className="display-4">Welcome!</h1>
            <p className="lead">
              To Trece Martires City College Automated Automated Students’
              Admission and Registration System
            </p>
            <hr className="my-4" />
            <p>If you are already registered please login.</p>
            <Link
              to="/login"
              className="btn btn-outline-success btn-lg"
              style={{ width: '20%' }}
            >
              Login here
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div class="row">
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Some content goes here</h5>
                      <p className="card-text">
                        Please add more content here so the site will look good.
                      </p>
                      <a href="#" className="btn btn-outline-secondary">
                        Go somewhere
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Some content goes here</h5>
                      <p className="card-text">
                        Please add more content here so the site will look good.
                      </p>
                      <a href="#" className="btn btn-outline-secondary">
                        Go somewhere
                      </a>
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

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
