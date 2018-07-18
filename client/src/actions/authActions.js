
import { GET_ERRORS } from './types';
import axios from 'axios';

//register user
export const registerUser = (userdata, history) => dispatch => {

    axios.post('/api/users/register', userdata)
    .then(res => history.push('/login'))
    .catch(err => 
    
        dispatch({
            
            type: GET_ERRORS,
            payload: err.response.data //this is coming from backend

        })
    );
}


