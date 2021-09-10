const Member = require('../../model/admin/member.model');
const Department = require('../../model/admin/department.model');
const Visitor = require('../../model/admin/visitor.model')
const { username, userpass } = require('../../helper/generate_username_pass');
const mongoose = require('mongoose');
const moment = require('moment');
// **** save member index
// **** get member index
exports.member_search = async (req, res) => {
    res.render('admin/dashboard/member/member_search', {
        pageTitle: "Search Member",
        pageName: "searchmember"
    })
}
exports.member_list = async (req, res) => {
    res.render('admin/dashboard/member/member_list', {
        pageTitle: "Member List",
        pageName: "list",
        member_info: ''
    })
}
exports.member_add = async (req, res) => {
    res.render('admin/dashboard/member/register_member', {
        pageTitle: "Register Member",
        pageName: "member",
        member_info: ''
    })
};
// **** save member
exports.save_menber = async (req, res) => {
    try {
        // generate unique username && password
        const name = username(req.body.first_name, req.get('host'));
        const password = userpass();
        // **** member object
        const member = {
            firstname: req.body.first_name,
            middlename: req.body.middle_name,
            lastname: req.body.last_name,
            username: name,
            password: password,
            gender: req.body.gender,
            dob: req.body.birthdate,
            position: req.body.position,
            joined_date: req.body.joindate,
            contact: {
                email: req.body.email,
                phone1: req.body.phoneno1,
                phone2: req.body.phoneno2,
                address: req.body.address,
            },
            department_ids: req.body.dept,
            pob: req.body.place_of_birth,
            occupation: req.body.occupation,
            nationality: req.body.nationality,
            baptism: {
                is_baptised: req.body.bapts,
                data_bapts: req.body.baptismdate,
                place_bapts: req.body.baptismplace,
            },
            marital_status: req.body.mstatus,
            spouse_name: req.body.spousename,
            date_of_marrage: req.body.married_date,
        }
        const result = await Member.create(member);
        if (result) {
            return res.status(200).json({ msg: "success", msginfo: "Records Saved successfully", action: "add" })
        }
        return res.status(500).json({ msg: 'error', msginfo: 'error saving data to server check your internet connection!!' })
    } catch (error) {
        console.log(error)
    }
}
// **** get all members
exports.get_members = async (req, res) => {
    try {
        const data = await Member.find({}, { firstname: 1, middlename: 1, lastname: 1 }).sort({ firstname: 1 }).limit(10);
        if (data) {
            return res.status(200).json({ msg: "success", members: data })
        }
        return res.status(500).json({ msg: 'errror', msginfo: "can't get members" })
    } catch (error) {
        console.log(error)
    }
}
// get members by department
exports.get_members_by_dept = async (req, res) => {
    try {
        const dept_id = mongoose.Types.ObjectId(req.body.data)
        const data = await Department.aggregate([
            { 
                $match:{_id:dept_id}
            },
            { 
                $lookup: { 
                    from:"members",
                    localField:"members",
                    foreignField:"_id",
                    as:"member"
                }
            },
            { 
                $unwind:"$member"
            },
            { 
                $project:{ 
                    dept_name:1,
                    "member._id":1,
                    "member.firstname":1,
                    "member.lastname":1,
                    "member.middlename":1,
                    "member.gender":1,
                    "member.email":1,
                    "member.position":1,
                    "member.contact.phone1":1,
                    "member.contact.phone2":1,
                    "member.contact.address":1,
                    "member.contact.email":1,
                    "member.dob":1,
                }
            }
        ]);
        if(data){ 
           return res.status(200).json({data})
        }
        return res.status(500).json({error:"error" , msg: "can't get department members"})
    } catch (error) {
        console.log(error)
        res.json({error:error})
    }
}
// **** search member (fulltext)
exports.search_member = async (req, res) => {
    try {
        const query = { $text: { $search: req.body.search } }
        const data = await Member.find(query, {
            firstname: 1, middlename: 1, lastname: 1,
            username: 1, gender: 1, dob: 1, position: 1,
            contact: 1
        });
        if (data) {
            return res.status(200).json({ data })
        }
    } catch (error) {
        console.log(error)
    }
}
// *** search  member (partials && fulltext) 
exports.search_member_info = async (req, res) => {
    try {
        const regExp = new RegExp(req.query.q, 'i')
        const data = await Member.find({ firstname: regExp }, { firstname: 1, middlename: 1, lastname: 1 }).sort({ created_at: 'desc' }).limit(20);
        if (data) {
            return res.status(200).json({ data })
        }
        return res.status(500).json({ error: "error", msg: "can't get users" })
    } catch (error) {
        console.log(error)
    }
}
// *** get member by id
exports.get_member_by_id = (view) => {
    return async (req, res) => {
        try {
            let id = mongoose.Types.ObjectId(req.params.id);
            const data = await Member.aggregate([
                {
                    $match: { "_id": id }
                },
                {
                    $lookup: {
                        from: "departments",
                        localField: "department_ids",
                        foreignField: "_id",
                        as: "department_info",
                    }
                },
            ])
            if (data) {
                data.forEach((item) => {
                    return res.status(200).render(`admin/dashboard/member/${view}`, {
                        pageTitle: "Member Profile",
                        pageName: "member_details",
                        member_info: item,
                        moment: moment
                    })
                })
            }
            return res.status(500).json({ error: "error", msg: "can't get user details" })
        } catch (error) {
            console.log(error)
        }
    }
}
exports.update_member_profile = async (req, res) => {
    try {
        const id = req.body.id;
        const updated = await Member.updateOne(
            { _id: id },
            {
                firstname: req.body.first_name,
                middlename: req.body.middle_name,
                lastname: req.body.last_name,
                gender: req.body.gender,
                dob: req.body.birthdate,
                position: req.body.position,
                joined_date: req.body.joindate,
                contact: {
                    email: req.body.email,
                    phone1: req.body.phoneno1,
                    phone2: req.body.phoneno2,
                    address: req.body.address,
                },
                department_ids: req.body.dept,
                pob: req.body.place_of_birth,
                occupation: req.body.occupation,
                nationality: req.body.nationality,
                baptism: {
                    is_baptised: req.body.bapts,
                    data_bapts: req.body.baptismdate,
                    place_bapts: req.body.baptismplace,
                },
                marital_status: req.body.mstatus,
                spouse_name: req.body.spousename,
                date_of_marrage: req.body.married_date,
            }
        )
        if (updated) {
            return res.status(200).json({ msg: "success", msginfo: "Records updated successfully", action: "update" })
        }
        return res.status(500).json({ msg: "error", msgtxt: "can't update member info!!" })
    } catch (error) {
        console.log(error)
    }
}
// add visitor for demo
exports.add_visitor = async (req, res) => { 
    try {
        const visitors = { 
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            gender: req.body.gender
        } 
        const visitorAdded = await Visitor.create(visitors);
        if(visitorAdded){ 
            return res.redirect('admin/member/add')
        }
    } catch (error) {
        console.log(error)
   }
}
