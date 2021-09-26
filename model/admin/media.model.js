var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var media = new Schema({
   image_name: {
      type: String,
      require: true
   },
   image_url: {
       type:String,
       require: true,
       unique:true,
   },
   secure_url: {
      type:String,
      require: true,
      unique:true,
  },
  cloudinary_id:{ 
      type:String, 
      require: true,
      unique: true,
   },
   public_id:{ 
      type:String, 
      require: true,
  }
});
module.exports = mongoose.model('media', media);
