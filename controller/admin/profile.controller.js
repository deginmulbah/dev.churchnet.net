const User = require('../../model/admin/adminUser.model');
const { validationResult } = require('express-validator');
const cloudinary = require('../../config/media_upload')
const bcrypt = require('bcrypt');
const moment = require('moment');
// ===================== get user pofile page =======================
exports.getProfile = async (req, res) => {
     try {
          const _id = req.session.user._id
          const user = await User.findById({ _id })
          res.render('admin/dashboard/user/profile', {
               pageTitle: "User Profile",
               userDetials: user,
               pageName:"profile",
               moment: moment
          })
     } catch (error) {
          console.log(error)
     }
}
//===================== Edit Profile ==========================
// @Get 
exports.getEditprofile = async (req, res) => {
     try {
          const _id = req.session.user._id
          const user = await User.findById({ _id })
          res.render('admin/dashboard/user/editprofile', {
               pageTitle: "Edit Profile",
               userInfo: {
                    username: req.session.user.username,
                    role: req.session.user.role,
                    fname: req.session.user.fname,
                    lname: req.session.user.lname,
                    avater: req.session.user.avater
               },
               userDetials: user,
               pageName :'edit_profile',
               moment: moment
          })
     } catch (error) {
          console.log(error)
     }
}
// @updata 
exports.updateUserProfile = async (req, res) => {
     const error = validationResult(req);
     if (!error.isEmpty()) {
          req.flash('error', error.array()[0].msg);
          return res.redirect('/admin/profile/edit_profile');
     }
     const id = req.session.user._id;
     const data = {
          fname: req.body.fname,
          mname: req.body.mname,
          lname: req.body.lname,
          username: req.body.username,
          phone: req.body.phone,
          address: req.body.address,
          bio: req.body.bio,
     }
     User.updateOne(
          { _id: id },
          {
          $set: {
               fname: data.fname,
               mname: data.mname,
               lname: data.lname,
               username: data.username,
               phone: data.phone,
               address: data.address,
               bio: data.bio,
          }
          },
          { new: true }
     ).then((doc) => {
          if (!doc) {
               req.flush('error', 'error occure while updating profile');
               return req.redirect('/admin/profile/edit_profile');
          }
          req.flash('success', 'Profile updated successfully');
          return res.redirect('/admin/profile/edit_profile');
     }).catch((error) => {
          console.log(error)
     })
}

exports.update_profile_pic = async (req, res) => {
     const id = req.session.user._id;
     let file;
     if (req.files === null) {
          // file = './public/uploads/useravater/08.png';
          req.flash('error', 'You did not select a picture to upload !')
          return res.redirect('/admin/profile/edit_profile')
     }
     if (req.files) {
          file = req.files.avater.tempFilePath;
          if (req.files.avater.mimetype != "image/png" &&
               req.files.avater.mimetype != "image/jpg" &&
               req.files.avater.mimetype != "image/jpeg") {
               req.flash('error', 'Invalid file type');
               return res.redirect('/admin/profile/edit_profile')
          }
     }
     cloudinary.uploader.upload(file, {
          widht: 140, height: 140, crop: "scale"
     }).then((result) => {
          User.updateOne(
               { _id: id },
               {
                    $set: {
                         avater: result.url,
                    },
               },
               { new: true }
          ).then((doc) => {
               if (doc) {
                    req.flash('success', 'Profile picture uploaded successfully')
                    return res.redirect('/admin/profile/edit_profile')
               }
          }).catch((err) => {
               console.log(err)
          })
     }).catch((error) => {
          console.log(error)
     })
}
// ===================== Reset admin password =========================
exports.restPassword = async (req, res) => {
     try {
          // validate input
          const error = validationResult(req);
          if (!error.isEmpty()) {
               const errpos = error.array()[0].param
               const errmsg = error.array()[0].msg
               return res.json({ msg: errpos, msgtxt: errmsg })
          }
          const { currpwd, newpwd } = req.body;
          const userid = req.session.user._id;
          const user = await User.findOne({ _id: userid });
          if (!user) return res.json({ msg: "error", msgtxt: "User don't exist" });
          const varifypwe = await bcrypt.compare(currpwd, user.password);
          if (!varifypwe) return res.json({ msg: "invalid", msgtxt: "Incorrect Password!!" });
          const hashPwd = await bcrypt.hash(newpwd, 10);
          const updatePwd = await User.updateOne(
               { _id: user._id },
               {
                    $set: {
                         password: hashPwd
                    }
               },
               { new: true });
          if (!updatePwd) return res.status(500).json({ msg: "error", msgtxt: "Unable to update Password" })
          return res.json({ msg: "success", msgtxt: "Password Updated Successfully" })
     } catch (error) {
          console.log(error)
          res.status(500)
     }
}