const express = require("express");
const router = express.Router();
const dashboard = require("../../controller/admin/dashboard.controller")
// get signed in user
router.get("/getSysInfo" , dashboard.getSysInfo);
router.get("/signedInUser" , dashboard.signedInUser);
router.get("/getVisitorsPermonth" , dashboard.getVisitorsPermonth);
module.exports = router;