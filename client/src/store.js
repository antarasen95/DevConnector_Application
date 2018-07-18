import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; //by default its index.js so no need to specify

const initialState = {};
const middleware = [thunk];

//createStore(reducer, [preloadedState], [enhancer])
//the first parameter is the reducer function
const store = createStore(
    rootReducer,
    initialState, 
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        //so this complicated line above is basically needed to implement the google chrome redux extension
    )
);

export default store;
