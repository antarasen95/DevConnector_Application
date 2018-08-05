import axios from 'axios';

const setAuthToken = token => {
  if (token) {
   // console.log('here');
   // console.log(token);

const auth_token = token.replace("Bearer", "Bearer ");
//console.log(auth_token);
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = auth_token;
  } else {
    console.log('in else loop');
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
