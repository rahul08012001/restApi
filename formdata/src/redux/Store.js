import {createStore} from 'redux';
// import thunk from 'redux-thunk';
import authReducer from './Reducers'; // Assuming you have an auth reducer



const store = createStore(authReducer);

export default store;