
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';

class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      //the fields whose state needs to be saved
      name: '' ,
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

componentWillReceiveProps(nextProps) {

    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
}

  //defining the onChange method
  onChange(e) {
    //whatever the user enters we want it to save it to the state variables
    this.setState({
      [e.target.name]: e.target.value
    })
    
  }

  onSubmit(e) {
    e.preventDefault();
    //so this is where we are going to register the user
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
    //allows us to redirect to the next page with Action
    //console.log(newUser)
  }

    render(){
      const { errors } = this.state;
      
        return (

            <div>
             
                  <h1 >Sign Up</h1>
                  <p >Create your DevConnector account</p>
                  <form noValidate onSubmit={this.onSubmit} >
                    <div className="form-group">
                      <input 
                      type="text"  
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                      })}
                      placeholder="Name" 
                      name="name" 
                      value={this.state.name}
                      onChange={this.onChange}
                       />
                    </div>
                    <div className="form-group">
                      <input type="email" 
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                      })}
                       placeholder="Email Address" 
                       name="email"
                       value={this.state.email}
                       onChange={this.onChange}
                        />
                      </div>
                    <div className="form-group">
                      <input type="password"  placeholder="Password" 
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                      })}
                      name="password" 
                      value={this.state.password}
                      onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input type="password"  placeholder="Confirm Password" 
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                      })}
                      name="password2"
                      value={this.state.password2} 
                      onChange={this.onChange}
                      />
                    </div>
                    <input type="submit"  />
                  </form>
                  </div>
               
        )
    }
}

//both registerUser and auth areb props of this component Register
Register.propTypes = {
  registerUser: PropTypes.func.isRequired, //bcoz it is a function
  auth: PropTypes.object.isRequired        //bcoz it is an object

}


//to have state maped
//so that it can be accessed as
//this.props.auth.username let say
const mapStateToProps = (state) => ({

    auth: state.auth, //this **auth** comes from the root reducer "index.js"
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
