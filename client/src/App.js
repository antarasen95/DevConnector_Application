//meeting place for everything

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import PrivateRoute from './components/common/PrivateRoute';


import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions'
import jwt_decode from 'jwt-decode';
import { logoutUser} from './actions/authActions';



// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //want to check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={ store } >
      {/* //surround the amin div with browserRouter */}
      <BrowserRouter>
      <div className="App">
      <Navbar />
        {/* <Landing /> */} 
        <Route exact path="/" component={Landing} />

      <div className="container">

      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>

      </div>

      <Footer />
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
