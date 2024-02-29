import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
  } from './Actions';
  
  const initialState = {
    loading: false,
    error: null,
  };
  
  const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case REGISTER_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default registrationReducer;