const express = require('express');
const router = express.Router();
const generalSetup = require('../../controller/admin/generalSetup.controller');
const { check } = require('express-validator');
const upload = require('../../middleware/fileupload')
//@GeneralSetup controller
//================ Get Post and Update GeneralSetup ================
router.get("/", generalSetup.general_setup);
router.post("/add_setup",
    check("churchname").trim(),
    check("address", "invalid address").trim(),
    check("email").isEmail().normalizeEmail(),
    check("address").trim(),
    check("pho1").trim(),
    check("pho2").trim(),
    check("country").trim(),
    check("county").trim(),
    check("city").trim(),
    check("year_est").trim().toDate(),
    check("curr_year").trim(),
    check("serv_start").trim(),
    check("serv_end").trim(), generalSetup.addSetup);
//
router.post("/update_setup",
    check("churchname").trim(),
    check("address", "invalid address").trim(),
    check("email").isEmail().normalizeEmail(),
    check("address").trim(),
    check("pho1").trim(),
    check("pho2").trim(),
    check("country").trim(),
    check("county").trim(),
    check("city").trim(),
    check("year_est").trim().toDate(),
    check("curr_year").trim(),
    check("serv_start").trim(),
    check("serv_end").trim(), generalSetup.update_setup)
// upload logo
router.post("/uoload_logo/:type",upload.single("logo") ,generalSetup.upload_logo);
module.exports = router