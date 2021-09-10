var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// member schama 
var visitor = new Schema({
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
  email: {
    type:String
  },
  phone:{
    type: String,
    required: true
  },
  address:{
    type:String,
  },
 gender: {
  type: String,
  required: true
},
});
module.exports = mongoose.model('visitor' , visitor)