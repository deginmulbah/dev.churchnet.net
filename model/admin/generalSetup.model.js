var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var generalSetting = new Schema({
   name: {
      type: String,
      require: true
   },
   address: {
      type: String,
      require: true
   },
   country: {
      type: String,
      require: true
   },
   states: {
      type: String,
      require: true
   },
   city: {
      type: String,
      require: true
   },
   service: {
      start: {
         type: String,
         require: true
      },
      end: {
         type: String,
         require: true
      }
   },
   contact: {
      email: {
         type: String,
         require: true
      },
      phone1: {
         type: String,
         require: true
      },
      phone2: {
         type: String
      },
   },
   about: {
      type: String,
   },
   year_est: {
      type: Date,
   },
   current_year: {
      type: Date,
      default: new Date(),
   },
   primary_account: {
      bank_name: {
         type: String,
      },
      acctNo: {
         type: String,
      }
   },
   secondary_account: {
      bank_name: {
         type: String,
      },
      acctNo: {
         type: String,
      }
   },
   created_at: {
      type:Date,
      default: new Date(),
   },
   is_inserted: { 
      type:Boolean,
      require: true,
      default:true,
   }
});
module.exports = mongoose.model('church_setup', generalSetting);
