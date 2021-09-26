const multer = require('multer');
let fs = require('fs-extra');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let type = req.params.type;
    let path = `./public/uploads/${type}`;
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});
// file filter
const fileFilter = (req, file, cb , next) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
 }
module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter:fileFilter
});