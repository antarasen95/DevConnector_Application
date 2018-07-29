const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    invites: {
        
    businessUnit: {
        type: String,
        required: true
    },
    racf: {
        type: String,
        required: true
    },
    offering: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},

myRequests: {

    businessUnit: {
        type: String
       // required: true
    },
    racf: {
        type: String
       // required: true
    },
    offering: {
        type: String
       // required: true
    },
    subject: {
        type: String
       // required: true
    },
    status: {
        type: Boolean,
        default: false
    }
    
}

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);