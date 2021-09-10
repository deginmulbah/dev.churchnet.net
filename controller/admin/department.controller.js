const Department = require('../../model/admin/department.model');

exports.dept_index = async (req, res) => {
    res.render('admin/dashboard/department/department', {
        pageTitle: "Department",
        pageName: 'dept_index'
    })
}
// @ADD DEPARTMENT
exports.add_dept = async (req, res) => {
    try {
        const data = {
            dept_name: req.body.deptname,
            dept_desc: req.body.deptdesc
        }
        const dept = await Department.create({
            dept_name: data.dept_name,
            dept_desc: data.dept_desc,
        });
        if (!dept) {
            return res.status(404).json({ msg: "error", msginfo: "Error inserting department" });
        }
        return res.status(200).json({ msg: "success", msginfo: "Department Created" });
    } catch (error) {
        console.log('error occure', error);
        res.status(500)
    }
}
//@GET DEPARTMENTS
exports.get_all_dept = async (req, res) => {
    try {
        const data = await Department.find({}, { dept_name: 1, dept_desc: 1 }).sort({ created_at: "desc" });
        if (data) {
            return res.status(200).json({ data })
        }
        return res.status(404).json({ msg: "error", msginfo: "No Department found" });
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}
//GET GET DEPARTMENTS BY ID
exports.get_dept_by_id = async (req, res) => {
    try {
        const id = req.body.id;
        const dept = await Department.findById({ _id: id })
        if (!dept) return res.status(500).send('Department not found!');
        return res.status(200).json({ dept })
    } catch (error) {
        console.log(error)
    }
}
//UPDATA DEPARTMENT
exports.updata_dept = async (req, res) => {
    try {
        const id = req.body.detp;
        const data = {
            dept_name: req.body.deptname,
            dept_head: req.body.depthead,
            dept_desc: req.body.deptdesc
        }
        const dept = await Department.updateOne(
            { _id: id },
            {
                $set: {
                    dept_name: data.dept_name,
                    dept_head: data.dept_head,
                    dept_desc: data.dept_desc,
                }
            },
            { upsert: true }
        )
        if (dept) {
            return res.status(200).json({ msg: "success", msginfo: "Changes has been saved" });
        }
        return res.status(500).json({ msg: "error", msginfo: "can't save changes" });
    } catch (error) {
        console.log(error)
    }
}
// @ DELETE DEPT
exports.delete_dept = async (req, res) => {
    try {
        const id = req.body.id;
        const remove_dept = await Department.findByIdAndRemove({ _id: id });
        if (remove_dept) {
            return res.status(200).json({ msg: "success", msginfo: 'Department has been deleted' })
        }
        return res.sendStatus(500).json({ msg: "error", msginfo: 'Unable to delete department' })
    } catch (error) {
        console.log(error)
    }
}
// 
exports.group_members = async (req, res) => {
    try {
        res.render('admin/dashboard/department/group_members', {
            pageTitle: "Group Members",
            pageName: "group_member"
        })
    } catch (error) {
        console.log(error)
    }
}
//@GET get department without members 
exports.get_dept_without_members = async (req, res) => {
    try {
        const data = await Department.find({ members: { $exists: true, $eq: [] } }, { dept_name: 1, dept_desc: 1 }).sort({ created_at: "desc" });
        if (data) {
            return res.status(200).json({ data })
        }
        return res.status(404).json({ msg: "error", msginfo: "No Department found" });
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}
// add department members
exports.add_member_to_dept = async (req, res) => {
    try {
        const dept_id = req.body.dept_name
        const data = {
            dept_head: req.body.dept_head,
            asst_head: req.body.asst_head,
            members: req.body.members
        }
        const update_dept = await Department.updateOne(
            { _id: dept_id },
            {
                $set: {
                    leaders: {
                        head: data.dept_head,
                        asst_head: data.asst_head
                    },
                    members: data.members
                }
            },
            { new: true }
        )
        if (update_dept) {
            return res.status(200).json({ msg: "success", msginfo: "Members added to department successfully" })
        }
        return res.status(500).json({ msg: "error", msginfo: "error added members to department!!" })
    } catch (error) {
        console.log(error)
    }
}
// get departments (head , asst head , members)
exports.get_dept_info_all = async (req, res) => {
    try {
        const data = await Department.aggregate([
            {
                $match: {members:{$exists:true, $ne:[]}}
            },
            {
                $lookup: {
                    from: 'members',
                    localField: 'leaders.head',
                    foreignField: '_id',
                    as: 'dept_head'
                }
            },
            {
                $lookup: {
                    from: 'members',
                    localField: 'leaders.asst_head',
                    foreignField: '_id',
                    as: 'dept_asst_head'
                },
            },
            {
                $project:{ 
                    dept_name:1,
                    members:1,
                    "dept_head._id":1,
                    "dept_head.firstname":1,
                    "dept_head.middlename":1,
                    "dept_head.lastname":1,
                    "dept_asst_head._id":1,
                    "dept_asst_head.firstname":1,
                    "dept_asst_head.middlename":1,
                    "dept_asst_head.lastname":1,
                }
            },
        ])
        if (data) {
            return res.status(200).json({ data })
        }
        return res.status(500).json({ error: "error getting record" })
    } catch (error) {
        res.json({ msg: "error", msg: error })
    }
}