$(document).ready(function () {
    // user header info 
    $.ajax({
        method: "GET",
        url: "/admin/dashboard/signedInUser",
        dataType: "json",
        success: function (data) {
            const set_avatar = $(".set_avatar");
            const role = $("#role");
            const fullname = $("#name");
            const name = `${data.fname} ${data.mname} ${data.lname}`
            // set data
            role.text(data.role);
            fullname.text(name)
            set_avatar.attr('src', data.avater)
        }
    });
    // system header info
    $.ajax({
        method:"GET",
        url:"/admin/dashboard/getSysInfo",
        dataType:"json",
        success: function (data){ 
            $("#church_name").text(data.name);
            $("#church_logo").prop("src" , `/uploads/logo/${data.logo}`)
        }
    })
});