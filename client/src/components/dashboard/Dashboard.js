import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import { createProfile } from '../../actions/profileActions';
import Modal from 'react-modal';
import axios from 'axios';



class DashBoard extends React.Component{

    constructor(props){
        super(props);
    
        this.state={
          modalIsOpen: false
        };
        this.openModal=this.openModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
      }

    componentDidMount(){
     this.props.getCurrentProfile();
    //    axios
    // .get('/api/profile')
    // .then(res => console.log(res.data ))
    // .catch(err => console.log('hello i m error', err))
    // 
}

    openModal(){
        this.setState({
          modalIsOpen: true
        });
        
      }

        //defining the onChange method
     onChange(e) {
    //whatever the user enters we want it to save it to the state variables
        this.setState({
        [e.target.name]: e.target.value
    })
    
  }
    
      onSearch(){
       // alert('hey');
       const profileData = {

        name: this.state.name,
        businessunit: this.state.businessunit,
        racf: this.state.racf,
        offering: this.state.offering
       }
       console.log(profileData);
       //this.props.createProfile(profileData, this.props.history);
      }
    render(){

        //dashboard should be rendered only if the user is loggedIn
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let profileItems;

        let dashboardContent;

        if(profile === null || loading){
            dashboardContent = <h4>loading....</h4>
        }
        else {
            //check if the loggedIn user has made any requests
            if(profile.length > 0){
                dashboardContent = <h4> todo: dispaly profile </h4>
            }
            else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome { user.name } </p>
                        <p> you have not yet setup a meeting</p>
                        <button className="btn btn-lg btn-info" onClick={() => {this.openModal()}}>
                        Set Up An Invite
                        </button>
                        </div>
               );            }
            
            
        }
        return(
            <div className="dashboard">
            <div className="container">
            <div className ="row">
            <div className="col-md-12">
            <h2 className="dispaly-4">DashBoard</h2>
            {dashboardContent}
            </div>
            </div>
            </div>
            <Modal
  isOpen={this.state.modalIsOpen}
  contentLabel="Invite Form"
  >
  <div style={{width:500}}>
  <h2>Invite Form</h2>
  <div>
    <form className="form-group">
          <label> Name </label>
          <br />
          <input 
          type="text" 
          placeholder="Name" 
          name="name" 
          value={this.state.name}
          onChange={this.onChange}
          />
          <br />
          <label> BusinessUnit</label>
          <br />
          <input 
          type="text"
          placeholder="BusinessUnit" 
          businessunit="businessunit" 
          value={this.state.businessunit}
          onChange={this.onChange}
           />
          <br />
          <label> Racf </label>
          <br />
          <input 
          type="text"
          placeholder="Racf" 
          racf="racf" 
          value={this.state.racf}
          onChange={this.onChange}
           />
          <br />
          <label> coffee/lunch</label>
          <br />
          <input 
          type="text"
          placeholder="offering" 
          offering="offering" 
          value={this.state.offering}
          onChange={this.onChange}
           />
          <br />
          <input type="submit" value="click me" onClick={this.onSearch} />
          
      </form>
    </div>
  </div>


    </Modal>
            
            </div>
        );
        
    }
}



DashBoard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
})

const actions = {getCurrentProfile, createProfile};

export default connect( mapStateToProps, actions)(withRouter(DashBoard));