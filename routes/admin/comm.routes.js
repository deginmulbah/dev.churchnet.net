const express = require('express');
const router = express.Router();
const communication = require('../../controller/admin/comm.controller');
const is_auth = require('../../middleware/is_auth');

router.get("/sendsms", is_auth, communication.sendsms);

module.exports = router