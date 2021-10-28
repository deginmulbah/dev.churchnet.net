const { validationResult } = require('express-validator');
const User = require('../../model/admin/adminUser.model');
const bcrypt = require('bcrypt');
const moment = require('moment');
const dashboardsession = require('../../controller/admin/dashboardheader');

//================ Get add user page =================
exports.create_user_account = async (req, res) => {
     try{ 
          const sessionId = req.session.user._id;
          // get session info
          const loggedinuser = await dashboardsession.signedInUser(sessionId);
          const systemInfo = await dashboardsession.getSysInfo();
          res.render('admin/dashboard/user/add_user_account', {
               pageTitle: "Add User Account",
               pageName: "create_user_account",
               userSession: loggedinuser,
               systemInfo: systemInfo
          })
     } catch(error) { 
          console.log(error)
          res.json({error:"true" , success:"false" , msg:error})
     }
}
//================ Create user =================
exports.addUser = async (req, res) => {
     try {
          const data = { 
               fname: req.body.fname,
               mname: req.body.mname,
               lname: req.body.lname,
               username: req.body.username,
               role: req.body.role,
               phone: req.body.pho,
               address: req.body.address
          }
          const user = await User.create({
               fname: data.fname,
               mname: data.mname,
               lname: data.lname,
               username: data.username,
               role: data.role,
               phone: data.pho,
               address: data.address
          })
          if (!user) {
               return res.status(500).json({
                    err: "error occure"
               })
          }
          return res.status(200).json({
               msg: "success", msgtxt: "User added successfully"
          })
     } catch (error) {
          res.json({error:"true" , success:"false" , msg:error})
     }
}
//================ view all user =================
exports.all_user = async (req, res) => {
     try { 
          const sessionId = req.session.user._id;
          // get session info
          const loggedinuser = await dashboardsession.signedInUser(sessionId);
          const systemInfo = await dashboardsession.getSysInfo();       
          res.render('admin/dashboard/user/view_users', {
               pageTitle: "Users Directory",
               pageName:  "all_user",
               userSession: loggedinuser,
               systemInfo: systemInfo
          })
     } catch (error) {
           res.json({error:"true" , success:"false" , msg:error})
     }
}
exports.get_get_users = async (req, res) => {
     try {
          const data = await User.find({}).sort({ created_at: "desc" });
          if(data){ 
             return res.status(200).json({data})
          } 
          return res.status(500).json({error:"error" , msg:"can't get users"})
     } catch (error) {
          res.json({error:"true" , success:"false" , msg:error})
     }
}
exports.delete_user_account = async (req, res) => {
     const id = req.params.id;
     try {
          const del_user = await User.findByIdAndRemove({ _id: id });
          if (!del_user) {
               req.flash('error', "error occure");
               return res.redirect('/admin/user/view_users')
          }
          console.log(del_user);
          req.flash('success', `${del_user.fname} account has been deleted !!`);
          return res.redirect('/admin/user/view_users');
     } catch (error) {
          res.json({error:"true" , success:"false" , msg:error})
     }
}
exports.edit_user_account = async (req, res) => {
     try {
          const sessionId = req.session.user._id;
          const id = req.params.id;
          // get session info
          const loggedinuser = await dashboardsession.signedInUser(sessionId);
          const systemInfo = await dashboardsession.getSysInfo();     
          const get_user = await User.findById({ _id: id });
          if (!get_user) {
               req.flash('error', 'User account not found');
               return res.redirect('/admin/user/view_users')
          }
          res.render('admin/dashboard/user/edit_user_account', {
               pageTitle: "User Account",
               pageName:'edit_user',
               user: get_user,
               userSession: loggedinuser,
               systemInfo: systemInfo
          })
     } catch (error) {
          res.json({error:"true" , success:"false" , msg:error})
     }
}
exports.update_user_account = async (req, res) => {
     const id = req.body.user_id;
     try {
          const data = {
               fname: req.body.fname,
               mname: req.body.mname,
               lname: req.body.lname,
               username: req.body.username,
               address: req.body.address,
               phone: req.body.phone,
               role: req.body.role,
          }
          const user = await User.findOneAndUpdate(
               { _id: id },
               {
                    $set: {
                         fname: data.fname,
                         mname: data.mname,
                         lname: data.lname,
                         username: data.username,
                         address: data.address,
                         phone: data.phone,
                         role: data.role,
                    }
               }
          )
          if (!user) {
               console.log("error occure")
               return res.redirect('/admin/user/edit_user_account/:id');
          }
          req.flash('success', `account was successfully update`);
          return res.redirect('/admin/user/view_users');
     } catch (error) {
          res.json({error:"true" , success:"false" , msg:error})
     }
}
exports.view_user_profile = async (req, res) => {
     try {
          const sessionId = req.session.user._id;
          const id = req.params.id;
          // get session info
          const loggedinuser = await dashboardsession.signedInUser(sessionId);
          const systemInfo = await dashboardsession.getSysInfo();
          const doc = await User.findById({ _id: id })
          if (doc) {
               return res.render('admin/dashboard/user/view_user_profile', {
                    pageTitle: "Profile",
                    pageName:"view_profile",
                    userDetials: doc,
                    userSession: loggedinuser,
                    systemInfo: systemInfo
               })
          }
          req.flash('error', 'user not found');
          return res.redirect('/admin/user/view_users')
     } catch (error) {
          res.json({error:"true" , success:"false" , msg:error})
     }
}
exports.reset_user_password = async (req, res) => {
     try {
          // validate input
          const error = validationResult(req);
          if (!error.isEmpty()) {
               const errpos = error.array()[0].param
               const errmsg = error.array()[0].msg
               return res.json({ msg: errpos, msgtxt: errmsg })
          }
          const newpwd = req.body.newpwd;
          // hash user password         
          const hashPwd = await bcrypt.hash(newpwd, 10);
          //update user password
          const updatePwd = await User.updateOne(
               { _id: req.body.id },
               {
                    $set: {
                         password: hashPwd
                    }
               },
               { new: true });
          if (!updatePwd) {
               return res.status(500).json({ msg: "error", msgtxt: "Unable to update Password" })
          }
          return res.json({ msg: "success", msgtxt: "Password Updated Successfully" })
     } catch (error) {
          res.json({error:"true" , success:"false" , msg:error})
     }
}
exports.user_header_info = async (req, res) => {
     const _id = req.session.user._id;
     try {
          const info = await User.findById({ _id: _id }, { role: 1, fname: 1, mname: 1, lname: 1, avater: 1, _id: 0 });
          if (!info) return res.status(500)
          return res.json(info)
     } catch (error) {
          res.json({error:"true" , success:"false" , msg:error})
     }
}