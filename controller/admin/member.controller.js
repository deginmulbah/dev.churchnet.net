const Member = require('../../model/admin/member.model');
const generate_pwd = require('../../helper/generate_pwd');
const moment = require('moment');
// **** search member page
exports.member_search = async (req, res) => {
    res.render('admin/dashboard/member/member_search', {
        pageTitle: "Search Member",
        pageName: "searchmember"
    })
}
// *** list members page
exports.member_list = async (req, res) => {
    res.render('admin/dashboard/member/member_list', {
        pageTitle: "Member List",
        pageName: "list",
        member_info: ''
    })
}
// *** add members page
exports.add_member = async (req, res) => {
    res.render('admin/dashboard/member/register_member', {
        pageTitle: "Add Members",
        pageName: "add",
        member_info: ''
    })
}
// **** save member details
exports.save_member = async (req, res) => {
    try {
        const member_id = req.body.id;
        if(req.file){ 
            const filetype = req.file.mimetype;
            if (filetype != "image/png" && filetype != "image/jpg" && filetype != "image/jpeg") {
                return res.json({ status: "fileerror", msg: "invali file type" })
            }
        }
        // generate user initial
        const fullname = `${req.body.fname} ${req.body.mname} ${req.body.lname}`;
        const matches = fullname.match(/\b(\w)/g);
        const initial = matches.join('').toLowerCase();
        // generate default username
        const fname_lname = [req.body.fname, req.body.lname];
        const username = fname_lname.join('.');
        //  default password
        const defaultpassword = generate_pwd;
        // profile img url
        const avater_url =  req.file ? '/' + req.file.path : '';
        // member details
        const member_details = {
            firstname: req.body.fname,
            middlename: req.body.mname,
            lastname: req.body.lname,
            initial: initial,
            gender: req.body.gender,
            username: username,
            password: defaultpassword,
            avater: avater_url,
            dates: {
                dob: req.body.dob,
                date_bapts: req.body.databaptized,
                joined_date: req.body.joindate,
            },
            contact: {
                primaryemail: req.body.primaryemail,
                primaryemail: req.body.secondaryemail,
                primarynumber: req.body.phone1,
                secondarynumber: req.body.phone2
            },
            address: {
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                address: req.body.address,
            }
        }
        if(!member_id){ //save user details
        const saved = await Member.create(member_details);
            if (saved) {
                return res.json({info:{status: 'success', msg: 'Member added successfully'}});
            }
        }
        if(member_id){ //update user details
        const updated = await Member.updateOne({_id:member_id} ,member_details);
            if (updated) {
                return res.redirect(`/admin/member/member_profile/${member_id}`)
            }
        }
    } catch (error) {
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// **** get all members
exports.get_members = async (req, res) => {
    try {
        const data = await Member.find({}, {firstname: 1, middlename: 1, lastname: 1,
         gender: 1, contact: 1 ,initial:1}).sort({ firstname: 1 });
        if (data) {
            return res.status(200).json({ data });
        }
    } catch (error) {
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// **** search member (fulltext)
exports.search_member = async (req, res) => {
    try {
        const query = { $text: { $search: req.body.data } }
        const data = await Member.find(query, {
            firstname: 1, middlename: 1, lastname: 1,
            gender: 1, contact: 1 ,initial:1,
        });
        if (data) {
            return res.status(200).json({ data });
        }
    } catch (error) {
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// search member
exports.search_qurey = async (req, res) => {
    try {
        const regExp = new RegExp(req.query.q, 'i')
        const data = await Member.find({ firstname: regExp }, { firstname: 1, middlename: 1, lastname: 1 }).sort({ created_at: 'desc' }).limit(20);
        if (data) {
            return res.status(200).json({ data })
        }
    } catch (error) {
     res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
exports.member_profile = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Member.find({_id:id});
        if(data){
           data.forEach((details) => { 
            return res.status(200).render("admin/dashboard/member/member_profile", {
                pageTitle: "Member Profile",
                pageName: "member_details",
                moment: moment,
                member: details,
                });
           }) 
         }
        }
        catch (error) {
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}