
import { GET_ERRORS } from '../actions/types';


const initialState = {};

//every reducer is going to export a function
//we dispatch "action" to the reducer
export default function(state = initialState, action) {
    //standard javascript switch
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        
        default:
            return state;
    }

}