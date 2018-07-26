
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//connecting this component to redux bcoz it requires the auth state now for implementing 
//conditional nav links
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Modal from 'react-modal';
 
class Navbar extends Component{


  constructor(props){
    super(props);

    this.state={
      modalIsOpen: false
    };

    this.openModal=this.openModal.bind(this);
  }

 
  onLogoutClick(e) {

    e.preventDefault();
    this.props.logoutUser();

  }

  openModal(){
    this.setState({
      modalIsOpen: true
    });
    
  }

  onSearch(){
    alert('hey');
  }

    render(){

      //we want to get from the auth state, now although from the auth properties
      //these all comes from the reducer
      
      // const initialState = {
      //   isAuthenticated: false,
      //   user: {}
      // };
      const { isAuthenticated, user } = this.props.auth;

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
          <a 
          href="" 
          onClick={this.onLogoutClick.bind(this)} 
          className="nav-link">
          <img src={user.avatar}  alt={user.name} style={{ width:'25px', marginRight: '5px' }} title="you must have a gravatar to your email" />
          Logout
          </a>
        </li>
        <li className="nav-item">
            <nav className="nav-link" onClick={() => {this.openModal()}}> Set Up  A Meet
            </nav>
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
  <Modal
  isOpen={this.state.modalIsOpen}
  contentLabel="Invite Form"
  >
  <div style={{width:500}}>
  <h2>invite form</h2>
  <div>
    <form className="form-group">
          <label> name </label>
          <br />
          <input type="text" />
          <br />
          <label> businessUnit</label>
          <br />
          <input type="text" />
          <br />
          <label> racf </label>
          <br />
          <input type="text" />
          <br />
          <label> coffee/lunch</label>
          <br />
          <input type="text" />
          <br />
          <input type="submit" value="click me" onClick={() => this.onSearch()} />
          
      </form>
    </div>
  </div>

    </Modal>
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
