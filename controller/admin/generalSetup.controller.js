const { validationResult } = require('express-validator');
const Church_setup = require('../../model/admin/generalSetup.model');
const Media = require('../../model/admin/media.model');
const moment = require('moment');
const cloudinary = require('../../config/media_upload')
//================ Get set page =================
exports.general_setup = async (req, res) => {
     try {
          const doc = await Church_setup.findOne({ is_inserted: true });
          res.render('admin/dashboard/setup/general_setup', {
               pageTitle: "General Setting",
               pageName: "general_setup",
               errorMessage: "",
               validationErrors: [],
               data: doc,
               moment: moment,
          })
     } catch (error) {
          console.log(error)
     };
}
//================ upload logo =================
exports.upload_logo = async (req, res) => {
     const file = req.files.logo;
     if (file.mimetype != 'image/png' && file.mimetype != 'image/jpg' && file.mimetype != 'image/jpeg') {
          return res.json({ msg: "error", msgtxt: `Invaid file format ${file.mimetype}!! Please add jpg/png/jpeg` });
     }
     cloudinary.uploader.upload(file.tempFilePath, {
          widht: 268, height: 65, crop: "scale"
     }).then((result) => {
          Media.create({
               image_name: file.name,
               cloudinary_id: result.asset_id,
               public_id: result.public_id,
               image_url: result.url,
               secure_url: result.secure_url,
          }).then((doc) => {
               if (!doc) {
                    return res.json({ msg: "error", msgtxt: err.message })
               }
               return res.json({ msg: "success", msgtxt: "Logo Added Successfully" })
          }).catch((err) => {
               return res.statu(500).json({ msg: "error", msgtxt: err.message })
          })
     }).catch((error) => {
          return res.statu(500).json({ msg: "error", msgtxt: error.message })
     })
}
//================ Add setup info =================
exports.addSetup = async (req, res) => {
     const { churchname, address, email, pho1, pho2, country,
          state, city, year_est, curr_year, serv_start, serv_end, history, accountno, bankname, accountno2, bankname2 } = req.body;
     const errors = validationResult(req);
     try {
          if (!errors.isEmpty()) {
               res.render('admin/dashboard/setup/general_setup', {
                    pageTitle: "General Setting",
                    pageName: "general_setup",
                    errorMessage: "",
                    validationErrors: [],
                    data: {}
               })
          }
          const add_setup = new Church_setup({
               name: churchname,
               address: address,
               country: country,
               states: state,
               city: city,
               contact: {
                    email: email,
                    phone1: pho1,
                    phone2: pho2,
               },
               service: {
                    start: serv_start,
                    end: serv_end
               },
               about: history,
               year_est: year_est,
               current_year: curr_year,
               primary_account: {
                    bank_name: bankname,
                    acctNo: accountno
               },
               secondary_account: {
                    bank_name: bankname2,
                    acctNo: accountno2,
               }
          })
          let doc = await add_setup.save();
          if (!doc) {
               req.flash('error', 'Error occure while inserting record')
               res.redirect("/admin/general_setup")
          }
          req.flash('success', 'Record Submitted successfully')
          res.redirect('/admin/general_setup/');
     } catch (error) {
          console.log(error)
     }
}

// =============== update setup ====================
exports.update_setup = async (req, res) => {
     try {
          const { churchname, address, email, pho1, pho2, country,
               state, city, year_est, curr_year, serv_start, serv_end, history, accountno, bankname, accountno2, bankname2 } = req.body;
          const updated = await Church_setup.updateOne({ _id: req.body.id }, {
               name: churchname,
               address: address,
               country: country,
               states: state,
               city: city,
               contact: {
                    email: email,
                    phone1: pho1,
                    phone2: pho2,
               },
               service: {
                    start: serv_start,
                    end: serv_end
               },
               about: history,
               year_est: year_est,
               current_year: curr_year,
               primary_account: {
                    bank_name: bankname,
                    acctNo: accountno
               },
               secondary_account: {
                    bank_name: bankname2,
                    acctNo: accountno2,
               }
          });
          if (updated) {
               req.flash('success', 'Records updated successfully')
              return res.redirect('/admin/general_setup');
          } 
          req.flash('error', 'Error updating record')
          return res.redirect('/admin/general_setup');
     } catch (error) {
          console.log(error)
     }
}