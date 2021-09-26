var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// member schama 
var visitor = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type:String
  },
  phone:{
    type: String,
    required: true,
  },
  address:{
    type:String,
  },
  gender: {
    type: String,
    required: true
  },
  note:{ 
   type:String,
  },
  visit_date:{ 
    type:Date,
    required:true
  },
  created_at:{ 
    type:Date,
    default:Date.now,
    required:true
  }
});
module.exports = mongoose.model('visitor' , visitor)