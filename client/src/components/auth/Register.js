
import React, { Component } from 'react';
import axios from 'axios';

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

    //console.log(newUser)
    axios.post('/api/users/register', newUser)
    .then(res => console.log(res.data))
    .catch(err => this.setState({errors: err.response.data}))

  }

    render(){
        return (

            <div>
                  <h1 >Sign Up</h1>
                  <p >Create your DevConnector account</p>
                  <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                      <input 
                      type="text"  
                      placeholder="Name" 
                      name="name" 
                      value={this.state.name}
                      onChange={this.onChange}
                       />
                    </div>
                    <div className="form-group">
                      <input type="email" 
                       placeholder="Email Address" 
                       name="email"
                       value={this.state.email}
                       onChange={this.onChange}
                        />
                      </div>
                    <div className="form-group">
                      <input type="password"  placeholder="Password" 
                      name="password" 
                      value={this.state.password}
                      onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <input type="password"  placeholder="Confirm Password" 
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

export default Register;
