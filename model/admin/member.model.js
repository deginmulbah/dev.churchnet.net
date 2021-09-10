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
  username:{ 
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true
  },
  contact:{ 
    email: {
      type:String
    },
    phone1:{
      type: String,
      required: true
    },
    phone2:{
      type:String,
      required: true
    },
    address:{
      type:String,
    } 
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  position: {
    type:String,
  },
  is_active: {
    type: Boolean
  },
  joined_date: {
    type:Date
  },
  pob: {
    type: String,
},
occupation: {
    type: String,
    required: true
},
nationality: {
  type: String,
  required: true
},
baptism: {
  is_baptised:{
      type: String,
    },
    data_bapts:{ 
      type:Date
    },
    place_bapts:{ 
      type:String 
    },
  },
  marital_status: {
    type: String,
    required: true
  },
  spouse_name:{
    type:String,
  },
  date_of_marrage:{ 
    type:Date
  },
  created_at:{
    type: Date,
    require: true, 
    default:Date.now 
  }
});
module.exports = mongoose.model('member' , menber)