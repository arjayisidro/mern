import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getAllRegisteredAdmission } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';

class StudentSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      isLoading: false,
      searchField: '',
      studentList: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllRegisteredAdmission();
  }

  componentWillReceiveProps(nextProps) {
    const { admissionStudents } = nextProps.students;
    this.setState({ studentList: admissionStudents });
  }

  onSubmit(e) {
    e.preventDefault();
    const { studentList, searchField } = this.state;
    const { admissionStudents } = this.props.students;
    this.setState({
      studentList: studentList.filter(
        data =>
          JSON.stringify(data)
            .toLowerCase()
            .indexOf(searchField.toLowerCase()) !== -1
      )
    });

    if (searchField === '') {
      this.setState({ studentList: admissionStudents });
    }
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
    const { errors, isLoading, studentList } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h3 className="mt-3">Student Admission Master List</h3>
            </div>
            <div className="col-md-4 mb-4">
              <form
                className="form-inline my-2 my-lg-12"
                onSubmit={this.onSubmit}
              >
                <TextFieldGroup
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search for student..."
                  aria-label="Search"
                  onChange={this.onChange}
                  value={this.state.searchField}
                  name="searchField"
                />
                <button
                  className="btn btn-outline-info ml-2 my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
            <table className="table text-left">
              <thead className="thead-light">
                <tr>
                  <th>Admission ID</th>
                  <th>Last name</th>
                  <th>Given name</th>
                  <th>Middle name</th>
                  <th />
                </tr>
              </thead>
              {!studentList ? (
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
                  {studentList &&
                    studentList.map(student => {
                      return (
                        <tr>
                          <td>{student.admissionId}</td>
                          <td>{student.lastName}</td>
                          <td>{student.firstName}</td>
                          <td>{student.middleName}</td>
                          <td>
                            <Link
                              className="btn btn-outline-success btn-sm"
                              to={{
                                pathname: '/registration-form',
                                state: student
                              }}
                            >
                              Register
                            </Link>
                          </td>
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
  getAllRegisteredAdmission: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  students: state.students,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllRegisteredAdmission }
)(withRouter(StudentSchedule));
