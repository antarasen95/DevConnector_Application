
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//connecting this component to redux bcoz it requires the auth state now for implementing 
//conditional nav links
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

 
class Navbar extends Component{


  onLogoutClick(e) {

    e.preventDefault();
    this.props.logoutUser();

  }


    render(){

      //we want to get from the auth state, now although from the auth properties
      //these all comes from the reducer
      
      // const initialState = {
      //   isAuthenticated: false,
      //   user: {}
      // };
      const { isAuthenticated } = this.props.auth;

      //now we will  create two links one is authenticated user links and one is guest links
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
              Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
          Login
          </Link>
        </li>
      </ul>
      );

      const authLinks = (
        <ul className="navbar-nav ml-auto">
         <li className="nav-item">
            <nav className="nav-link" > About Us
            </nav>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/feed">
          Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <a 
          href="" 
          onClick={this.onLogoutClick.bind(this)} 
          className="nav-link">
            Logout
          </a>
        </li>
       
      </ul>
      );

        return (
    <div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">DevConnector</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        
          
          {isAuthenticated ? authLinks : guestLinks}
     
      </div>
    </div>
  </nav>
  
  </div>

        )
    }
}


Navbar.propTypes = {

  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

//we are going to bring here the current authentication state by mapping state to props
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);
