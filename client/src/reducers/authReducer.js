
const initialState = {

    isAuthenticated: false,
    user: {},
    hello: 'test'
}

//every reducer is going to export a function
//we dispatch "action" to the reducer
export default function(state = initialState, action) {
    //standard javascript switch
    switch(action.type) {
        //we ll have cases
        // case TEST_DISPATCH:
        // return {
        //     ...state,
        //     user: action.payload
        // }
        default:
            return state;
    }

}