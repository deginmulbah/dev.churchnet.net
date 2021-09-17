const multer = require('multer');
const fileStorage = multer.diskStorage({
  destination:( req , file , cb) => { 
    cb(null , './uploads')
  },
  filename:(req, file , cb) =>{ 
    cb(null , Date.now() +'--'+ file.originalname)
  }
});
const fileFilter = (req, file, cb) =>{
  // Validate the files
  if(file.mimetype != 'image/png' &&  file.mimetype != 'image/jpg' && file.mimetype != 'image/jpeg') { 
       cb(null , false);
    } else { 
      cb(null,true);
  }
};
const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter
});
module.exports = upload