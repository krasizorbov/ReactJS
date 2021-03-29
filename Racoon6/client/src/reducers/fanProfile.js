import {
  GET_FAN_PROFILE,
  FAN_PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_FAN_PROFILE,
} from '../actions/types';

const initialState = {
  fanProfile: null,
  loading: true,
  error: {},
};

function fanProfileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FAN_PROFILE:
    case UPDATE_FAN_PROFILE:
      return {
        ...state,
        fanProfile: payload,
        loading: false,
      };
    case FAN_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        fanProfile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        fanProfile: null,
      };
    default:
      return state;
  }
}

export default fanProfileReducer;
