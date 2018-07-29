import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';


export default combineReducers({
    //here we will set an object with our reducers so that 
    auth: authReducer, //component will use it as "this.props.auth"
    //similarly we will create our other reducers: profiles and posts as well
    //here we basically combine all our reducers
    errors: errorReducer,
    profile: profileReducer
});