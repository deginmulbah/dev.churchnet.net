const express = require("express");
const router = express.Router();
const visitor = require("../../controller/admin/visitor.controller");
const {validation} = require("../../middleware/validation");
const {body, check } = require('express-validator');
// 
router.post("/save_visitor", 
  check('name').custom((value) => {
    if(value === "") return Promise.reject("Name is required");
    return true;
  }),
  check('phone').custom((value) => {
    if(value === "") return Promise.reject("Phone number is required");
    return true;
  }),
  check('gender').custom((value) => {
    if(!value) return Promise.reject("Gender is required");
    return true;
  }),
  check('visit_date').custom((value) => {
    if(value === "") return Promise.reject("Date visited is required");
    return true;
  }),
validation , visitor.addVisitor);
// 
router.get("/get_visitor" , visitor.getVisitors);
router.post("/get_visitors_per_month" , visitor.getVisitorsPermonth);
module.exports = router