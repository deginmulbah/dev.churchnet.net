const express = require('express');
const router = express.Router();
const fundraise = require('../../controller/admin/fundraise.controller');
const {body, check } = require('express-validator');
//
router.get("/add",fundraise.add_fund);
router.get("/category",fundraise.fund_campaign);
router.get("/bulk_giving",fundraise.multiple_giving);
// 
router.post("/create_campaign", 
check('title').custom((value) => {
    if(value === "") return Promise.reject("This field is required");
    return true;
}),
check('amount').custom((value) => {
    if(value === "") return Promise.reject("This field is required");
    if(value <= 0) return Promise.reject("Amount most be greater then $0");
    return true;
}),
fundraise.add_campaign)
module.exports = router