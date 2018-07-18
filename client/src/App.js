//meeting place for everything

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


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

      </div>

      <Footer />
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
