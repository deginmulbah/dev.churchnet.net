const express = require('express');
const router = express.Router();
const adminindex = require('../../controller/admin/index.controller');
const is_auth = require('../../middleware/is_auth');
// @index controller
//================== Get admin index ================
router.get("/index", is_auth, adminindex.getDashboard);

module.exports = router
