const express = require('express');
const router = express.Router();
const group_controller = require('../../controller/admin/group.controller');
const Group = require('../../model/admin/group.model')
const { check } = require('express-validator');
const { validation } = require('../../middleware/validation');
router.get("/add",group_controller.addGroup);
router.get("/list",group_controller.groupList);
// save group details
router.post("/save_group",
check("groupname").custom( async (value) => {
    const group = await Group.findOne({ group_name: value });
    if (group) return Promise.reject("Group already exist");
    if (value === "") throw new Error("Group name is require!");
    return true;
}),validation, group_controller.saveGroup);
// update group details
router.post("/update_group",
check("groupname").custom( async (value) => {
    if (value === "") throw new Error("Group name is require!");
    return true;
}),validation, group_controller.saveGroup);
// get groups and leaders
router.get("/get_groups",group_controller.getGroups);
// add group member
router.post('/add_group_member',group_controller.addGroupMember);
// get all group details
router.get("/group_details/:id",group_controller.getGroupDetails);
// remove group leader
router.post("/remove_group_leader",group_controller.removeGroupLeader);
// add group leaders
router.post("/add_group_leader",group_controller.addGroupLeaders);
// search group 
router.get('/search_query',group_controller.search_qurey);
// get group member
router.post('/get_group_members',group_controller.getGroupMember);
// remove group meeting day
router.post('/remove_meetingday',group_controller.removeGroupMeetingDay);
module.exports = router