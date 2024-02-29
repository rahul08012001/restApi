export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS,
});

export const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});