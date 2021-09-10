const express = require('express');
const router = express.Router();
const generalSetup = require('../../controller/admin/generalSetup.controller');
const is_auth = require('../../middleware/is_auth');
const { check } = require('express-validator');

//@GeneralSetup controller
//================ Get Post and Update GeneralSetup ================
router.get("/", is_auth, generalSetup.general_setup);
router.post("/add_setup", is_auth,
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
    check("serv_end").trim(), is_auth, generalSetup.update_setup)
// upload logo
router.post("/uoload_logo", is_auth, generalSetup.upload_logo);
module.exports = router