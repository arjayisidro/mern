import { STUDENT_LOADING, GET_STUDENTS } from '../actions/types';

const initialState = {
  loading: false,
  students: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
