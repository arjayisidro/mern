import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_STUDENT,
  CLEAR_CURRENT_PROFILE,
  SET_ADMISSION_STATE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  student: null,
  isSuccess: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_ADMISSION_STATE:
      return {
        ...state,
        isSuccess: action.payload
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
