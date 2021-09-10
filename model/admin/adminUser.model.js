var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fname: {
    type: String
  },
  mname: {
     type: String
  },
  lname: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  phone:{ 
    type:String,
  },
  address: {
    type:String
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default:"superadmin"
  },
  created_at: {
    type: Date,
    require: true,
    default:  Date.now
  },
  status: {
    type: String,
    require: true,
    default: "active"
  },
  is_login:{ 
    type:Boolean,
    require: true,
    default: false
  },
  avater: {
    type: String
  },
  bio:{ 
    type:String
  }
});
module.exports = mongoose.model('User', userSchema);