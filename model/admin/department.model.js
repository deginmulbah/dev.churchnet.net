var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var department = new Schema({
  dept_name: {
    type: String,
    required: true,
    unique: true,
  },
  leaders: {
    head:{ 
      type: Schema.Types.ObjectId,
      ref: 'member',
    },
    asst_head:{ 
      type: Schema.Types.ObjectId,
      ref: 'member',
    }
  },
  members:[
    {
      type: Schema.Types.ObjectId,
      ref: 'member',
    },
  ],
  dept_desc: {
    type:String,
  },
  created_at: { 
    type: Date,
    require: true,
    default: Date.now,
  }
});
module.exports = mongoose.model('department' , department)