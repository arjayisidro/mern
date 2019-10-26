import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getAllStudents } from '../../actions/profileActions';

class StudentSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllStudents();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onClear(e) {
    e.preventDefault();
    this.setState({
      errors: {}
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, isLoading } = this.state;
    const { students } = this.props.students;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4">Student Master List</div>
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
              {!students ? (
                <span
                  className="spinner-border spinner-border-sm text-info"
                  role="status"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 'calc(50% - 45px)',
                    textAlign: 'center',
                    width: '50px',
                    height: '50px'
                  }}
                />
              ) : (
                <tbody className="">
                  {students &&
                    students.map(student => {
                      return (
                        <tr>
                          <td>{student.studentId}</td>
                          <td>{student.lastName}</td>
                          <td>{student.givenName}</td>
                          <td>{student.middleName}</td>
                          <td>{student.yearLevel}</td>
                          <td>{student.completeProgramName}</td>
                        </tr>
                      );
                    })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

StudentSchedule.propTypes = {
  students: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  getAllStudents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  students: state.students,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllStudents }
)(withRouter(StudentSchedule));
