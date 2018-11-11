import React from 'react';
import axios from 'axios';
import { getCurrentProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Dashboard2 extends React.Component{

  constructor(props){
    super(props);

    this.state={
      resData: []
    }
  }
  componentDidMount(){
    // this.props.getCurrentProfile();
    // console.log(this.props.profile);
    
      axios
   .get('/api/profile')
   .then(res => this.setState({
     resData: res.data
   }))
   .catch(err => console.log('hello i m error', err))

   console.log(this.state.resData)
   
}
    render(){
        return(
           <div> 
          Dashboard2
        </div>
                
        )
    }
}


Dashboard2.propTypes = {
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


export default connect( mapStateToProps, { getCurrentProfile })(Dashboard2)