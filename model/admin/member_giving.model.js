const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// member schama 
const member_gives = new Schema({
    member_id:{ 
      type: Schema.Types.ObjectId,
      ref:"members",
      require:true
    },
    amount:{ 
      type: Number,
      require:true
    },
    date:{
      type:Date,
      require:true
    },
    check_number:{
      type:String,
    },
    category:{ 
      type: String,
      // ref:"giving_category",
      require:true
    },
    note:{
      type:String
    },
    created_at:{ 
      type: Date,
      require:true,
      default:Date.now
    }
});
module.exports = mongoose.model('member_give' ,member_gives);