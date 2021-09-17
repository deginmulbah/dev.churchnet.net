const express = require('express');
const router = express.Router();
const group_controller = require('../../controller/admin/group.controller');
const Group = require('../../model/admin/group.model')
const { check } = require('express-validator');
const { validation } = require('../../middleware/validation');

router.get("/add", group_controller.add_group);
router.get("/list", group_controller.group_list);
// save group details
router.post("/save_group",
check("groupname").custom( async (value) => {
    const group = await Group.findOne({ group_name: value });
    if (group) return Promise.reject("Group already exist");
    if (value === "") throw new Error("Group name is require!");
    return true;
}),
check('groupleaders').custom(value => { 
    if(!value) return Promise.reject("Please selecet a group leader");
    return true;
}),validation, group_controller.save_group);
// get groups and leaders
router.get("/get_groups" , group_controller.get_groups);
// get all group details
router.get("/group_details/:id" , group_controller.get_group_details);
module.exports = router