const express = require("express");
const router = express.Router();
const sms = require("../../controller/admin/sms.controller");
const { check } = require('express-validator');
const { validation } = require('../../middleware/validation');
// send sms to group
router.post('/groupsms',
    check("receiver").custom(async (value) => {
        if (!value) throw new Error("Please select receiver");
        return true;
    }),
    check("msg").custom(async (value) => {
        if (value === "") throw new Error("Type a message");
        return true;
    }), validation, sms.sendGroupsms);
// send sms to visitors
router.post("/visitor_sms",
    check("receiver").custom(async (value) => {
        if (!value) throw new Error("Please select a receiver!");
        return true;
    }),
    check("msg").custom(async (value) => {
        if (value === "") throw new Error("Type a message");
        return true;
    }), validation, sms.sendVisitorsms);
module.exports = router