// 1: add family
// ***********************
const Member = require('../../model/admin/member.model');
const Giving = require('../../model/admin/member_giving.model');
const generate_pwd = require('../../helper/generate_pwd');
const moment = require('moment');
const mongoose = require('mongoose');
const dashboardsession = require('../../controller/admin/dashboardheader');
// **** member  search page
exports.member_search = async (req, res) => {
    try{ 
        // get session info
        const _id = req.session.user._id;
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        res.render('admin/dashboard/member/member_search', {
            pageTitle: "Search Member",
            pageName: "searchmember",
            userSession: loggedinuser,
            systemInfo: systemInfo
        })
    } catch (error) { 
       res.status(500).json({error:"true" , success:"false" , msg:error})
    }
}
// ***  members list page
exports.member_list = async (req, res) => {
    try { 
         // get session info
        const _id = req.session.user._id;
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        res.render('admin/dashboard/member/member_list', {
            pageTitle: "Member List",
            pageName: "listmember",
            member_info: '',
            userSession: loggedinuser,
            systemInfo: systemInfo
        })
    } catch (error) { 
        res.status(500).json({error:"true" , success:"false" , msg:error})
    }
}
// *** add members page
exports.add_member = async (req, res) => {
    try{ 
        // get session info
        const _id = req.session.user._id;
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        res.render('admin/dashboard/member/register_member', {
            pageTitle: "Add Members",
            pageName: "add",
            member_info: '',
            userSession: loggedinuser,
            systemInfo: systemInfo
        })
    } catch (error) { 
        res.json(500).json({error:"true" , success:"false" , msg:error})
    }
}
// **** save / update member details
exports.save_member = async (req, res) => {
    try {
        const member_id = req.body.id; // member id use for updata
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
        const filename = (req.file) ? req.file.filename : '';
        // member details
        const member_details = {
            firstname: req.body.fname,
            middlename: req.body.mname,
            lastname: req.body.lname,
            initial: initial,
            gender: req.body.gender,
            username: username,
            password: defaultpassword,
            avater: filename,
            dates: {
                dob: req.body.dob,
                date_bapts: req.body.databaptized,
                joined_date: req.body.joindate,
            },
            groups:req.body.group,
            contact: {
                primaryemail: req.body.primaryemail,
                secondaryemail: req.body.secondaryemail,
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
        if(member_id){ //update user details
            const {groups,...newDetails} = member_details;
            const updated = await Member.updateOne({_id:member_id} ,newDetails);
            if (updated) res.json({status: 'success', msg: 'Record updated successfully', action:'update'});
        } else {  
            //save user details
            const saved = await Member.create(member_details);
            if (saved) res.json({status: 'success', msg: 'Member added successfully', action:'add'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// **** get all members
exports.get_members = async (req, res) => {
    try {
        const data = await Member.find({}, {firstname:1,middlename:1,lastname:1,
         gender:1,contact:1,initial:1}).sort({firstname:1});
        if (data) return res.status(200).json({data});
    } catch (error) {
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// **** search member (fulltext)
exports.search_member = async (req, res) => {
    try {
        const query = {$text:{$search:req.body.data}}
        const data = await Member.find(query,{
            firstname:1,middlename:1,lastname:1,
            gender:1,contact:1,initial:1
        });
        if (data) return res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// search member
exports.search_qurey = async (req, res) => {
    try {
        const regExp = new RegExp(req.query.q, 'i')
        const data = await Member.find({firstname:regExp},
            {firstname:1,middlename:1,lastname:1})
            .sort({created_at:'desc'});
        if (data) return res.status(200).json({ data })
    } catch (error) {
     res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// add member to group
exports.add_member_group = async (req, res) => { 
    try{
        const member_id = req.body.id;
        const group = req.body.group; 
        const added = await Member.updateOne({_id:member_id},{$push:{groups:group}});
        if(added) res.status(200).json({success:"true" , error:"false", msg:"Member added to group"})
    } catch (error){ 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// remove member from group
exports.remove_group_member = async (req, res) => { 
    try{
        const member_id = req.body.id;
        const group_id = req.body.group; 
        const removed = await Member.update(
            {_id:member_id},
            {$pull:{groups:group_id}}
        );
        if(removed) res.status(200).json({success:"true" , error:"false", msg:"group removed"})
    } catch (error){ 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// add / update member givings
exports.member_giving = async (req, res) => { 
    try{
        const giving_id = req.body.giving_id;
        const giving = { 
            member_id:req.body.id,
            amount: req.body.amount,
            date:req.body.date,
            check_number:req.body.checkno,
            category:req.body.category,
            note : req.body.note
        }
        if(giving_id){ 
            const {member_id,...newGiving} = giving;
            const updated = await Giving.update({_id:giving_id},newGiving);
            if(updated) res.status(200).json({success:"true" , status:"success", msg:"Record updated successfully", action:"update"})
        } else { 
            const saved = await Giving.create(giving);
            if(saved) res.status(200).json({success:"true" , status:"success" ,msg:"Giving Recorded" , action:"add"})
        }
    } catch (error){ 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// get member givings
exports.get_givings = async (req ,res) => { 
    try{
        const id = req.body.id; // member id
        const data = await Giving.find({member_id:id});
        if(data) res.status(200).json({data});
    } catch (error){ 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// get giving by id
exports.get_giving = async (req ,res) => { 
    try{
        const id = req.body.id; // giving id
        const data = await Giving.findOne({_id:id});
        if(data) res.status(200).json({data});
    } catch (error){ 
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
// get total some of giving
exports.get_totals = async (req ,res) => {
    try{
    const id = mongoose.Types.ObjectId(req.body.id);
    const totals = await Giving.aggregate([
        {$match:{member_id:id}},
        {$group:{_id:"$category" , total:{$sum:"$amount"}}},
    ]);
    if(totals) res.status(200).json({totals});
    } catch  (error){
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    }
}
exports.delete_giving = async (req,res) => { 
    try{ 
        const giving_id = req.body.id;
        const deleted  = await Giving.deleteOne({_id:giving_id});
        if (deleted) res.status(200).json({success:"true" , status:"success", msg:"Record updated successfully", action:"update"});
    } catch (error) { 
        res.status(500).json({success:"false" , error:"ture" , msg:error});   
    }
}
// add member family
// // ** bug
// exports.add_member_family = async(req,res) => { 
//     try{
//        const fam = req.body.fam;
//        const rel = req.body.fam_rel;
//        const id = req.body.member_id; 
//        const saveFam = await Member.update(
//          {_id:id},
//          {$push:{family:[{family_id:fam, family_rel:rel}]}}
//         )
//        res.redirect(`/admin/member/member_profile/${id}`)
//     } catch(error){ 
//          res.status(500).json({success:"false" , error:"ture" , msg:error});
//     }
// }
// *** get member profile
exports.member_profile = async (req, res) => {
    try {
        const _id = req.session.user._id;
        // get session info
        const loggedinuser = await dashboardsession.signedInUser(_id);
        const systemInfo = await dashboardsession.getSysInfo();
        //get member personanl info
        const id = mongoose.Types.ObjectId(req.params.id);
        const data = await Member.find({_id:id});
        if(data){ 
        //get member group info
        const group = await Member.aggregate([
            {$match: {_id:id}},
            {
                $lookup:{
                    from:"groups",
                    localField:"groups",
                    foreignField:"_id",
                    as:"group_info"
                }
            },
            {$unwind:"$group_info"},
            {
                $project:{ 
                    "group_info._id":1,
                    "group_info.group_name":1,
                }
            }
            ]);
            // family details
            const member_family = await Member.aggregate([
                {$match: {_id:id}},
                { 
                    $lookup:{
                        from:"members",
                        localField:"family.family_id",
                        foreignField:"_id",
                        as:"family_info"
                    }
              },
              // {$unwind:"$family_member"},
              {
                $project:{
                    family:1,
                    "family_info._id": 1,
                    "family_info.firstname":1,
                    "family_info.lastname":1,
                }
              }
            ]);
            // let fam_obj = [];
            // member_family.map((element , i) => { 
            //     const family = element.family;
            //     const family_info = element.family_info;
            //     family.map((fam_ele) => { 
            //         fam_obj.push(fam_ele);
            //     });
            //     family_info.map((fam_info) => { 
            //         fam_obj.push(fam_info);
            //     })
            // });
            // fam_obj.map((el) => { 
            //     const fam_details = { 
            //        objId:el._id,
            //        fam_rel:el.family_rel,
            //        fam:{ 
            //             id:el._id,
            //             firstname:el.firstname,
            //        } 
            //     }
            //     console.log(fam_details)
            // })
            // console.log(fam_obj);
            // res.send(member_family);
            // member profile page
           data.forEach((details) => { 
            return res.status(200).render("admin/dashboard/member/member_profile", {
                pageTitle: "Member Profile",
                pageName: "member_details",
                moment: moment,
                member: details,
                group: group,
                family:member_family,
                userSession: loggedinuser,
                systemInfo: systemInfo
            });
           }) 
         }
        }
        catch (error) {
        res.status(500).json({success:"false" , error:"ture" , msg:error});
    };
}