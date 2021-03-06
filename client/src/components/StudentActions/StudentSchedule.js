import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getAllStudents } from '../../actions/profileActions';
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
    this.props.getAllStudents();
  }

  componentWillReceiveProps(nextProps) {
    const { students } = nextProps.students;
    this.setState({ studentList: students });
  }

  onSubmit(e) {
    e.preventDefault();
    const { studentList, searchField } = this.state;
    const { students } = this.props.students;
    this.setState({
      studentList: studentList.filter(
        data =>
          JSON.stringify(data)
            .toLowerCase()
            .indexOf(searchField.toLowerCase()) !== -1
      )
    });

    if (searchField === '') {
      this.setState({ studentList: students });
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
              <h3 className="mt-3">Registered Student Master List</h3>
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
                <tr className="text-center">
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Year Level</th>
                  <th>Program Name</th>
                  <th>Action</th>
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
              ) : studentList.length > 0 ? (
                <tbody className="">
                  {studentList &&
                    studentList.map(student => {
                      return (
                        <tr className="text-center">
                          <td style={{ width: '10%' }}>{student.studentId}</td>
                          <td>{student.studentName}</td>
                          <td>{student.yearLevel}</td>
                          <td style={{ width: '15%' }}>{student.course}</td>
                          <td>
                            <Link
                              className="ml-2 btn btn-outline-warning btn-sm"
                              to={`/registered-printed/${student._id}`}
                            >
                              Download Forms
                            </Link>
                            <Link
                              className="ml-2 btn btn-outline-info btn-sm"
                              to={{
                                pathname: '/registration-form',
                                state: student
                              }}
                            >
                              Update
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              ) : (
                <tbody className="">
                  <tr>
                    <td />
                    <td />
                    <td>No Records Found.</td>
                  </tr>
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

export default connect(mapStateToProps, { getAllStudents })(
  withRouter(StudentSchedule)
);
