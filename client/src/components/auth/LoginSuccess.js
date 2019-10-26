import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import logo from '../../img/logo.png';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

class LoginSuccess extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      is_loading: false,
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      this.setState({ is_loading: false });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ is_loading: true });

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    return (
      <div class="jumbotron mt-6">
        <h1 class="display-4">Welcome!</h1>
        <p class="lead">
          Thank you for registering! This is Trece Martirez City College online
          portal.
        </p>
        <hr class="my-4" />
        <p>Your one-stop online school needs!</p>
        Login <Link to="/login"> here</Link>
      </div>
    );
  }
}

LoginSuccess.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginSuccess);
