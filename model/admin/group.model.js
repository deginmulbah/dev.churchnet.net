var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var group = new Schema({
  group_name: {
    type: String,
    required: true,
    unique: true,
  },
  group_leaders: [
    { 
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'member',
    },
  ],
  group_desc: {
    type:String,
  },
  meeting_days:[
    {
       type:String,
    }
  ],
  meeting_time:[
    {
      type:String,
    }
  ],
  created_at: { 
    type: Date,
    require: true,
    default: Date.now,
  }
});
module.exports = mongoose.model('group' , group)