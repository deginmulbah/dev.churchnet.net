var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// member schama 
var menber = new Schema({
  firstname: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
    required: true
  },
  initial: {
    type: String
  },
  gender: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique:true,
  },
  groups:[
    {
      type: Schema.Types.ObjectId,
      ref: 'group',
    },
  ],
  dates: {
    dob: {
      type: Date
    },
    date_bapts: {
      type: Date
    },
    joined_date: {
      type: Date
    },
  },
  contact: {
    primaryemail: {
      type: String
    },
    secondaryemail:{ 
      type:String
    },
    primarynumber: {
      type: String,
      required: true
    },
    secondarynumber: {
      type: String,
    },
  },
  address: {
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    address: {
      type: String
    }
  },
  avater: {
    type: String
  },
  created_at: {
    type: Date,
    require: true,
    default: Date.now
  }
});
module.exports = mongoose.model('member', menber)