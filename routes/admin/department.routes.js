const express = require('express');
const router = express.Router();
const is_auth = require('../../middleware/is_auth');
const department = require('../../controller/admin/department.controller');
const Dept = require('../../model/admin/department.model')
const { body } = require('express-validator');
const { validation } = require('../../middleware/validation');

router.get("/list", is_auth, department.dept_index);
router.post("/add_dept",
    body("deptname").custom(async (value) => {
        const dept = await Dept.findOne({ dept_name: value });
        if (dept) return Promise.reject("Department name already exist");
        if (value === "") {
            throw new Error("Department name is require!");
        } else {
            return true
        }
    }),
    is_auth, validation, department.add_dept);
router.get('/get_dept', is_auth, department.get_all_dept);
router.post('/get_dept_id', is_auth, department.get_dept_by_id);
router.post('/update_dept',
    body("deptname").custom(async (value) => {
        if (value === "") {
            throw new Error("Department name is require!");
        } else {
            return true
        }
    }),
    body("depthead").custom((value) => {
        if (value === "") {
            throw new Error("Department head is require!");
        } else {
            return true
        }
    }),
is_auth, validation, department.updata_dept);
router.delete('/delete', is_auth, department.delete_dept);
router.get('/get_dept_without_member', is_auth, department.get_dept_without_members);
router.get('/get_dept_info_all' ,is_auth, department.get_dept_info_all)
router.get('/group_members', is_auth,department.group_members);
router.post('/add_member_to_dept', is_auth,department.add_member_to_dept);
module.exports = router