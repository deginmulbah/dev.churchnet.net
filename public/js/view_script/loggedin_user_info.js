$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "/admin/user/user_header_info",
        dataType: "json",
        success: function (data) {
            setHaeder(data);
        }
    });
    function setHaeder(data) { 
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