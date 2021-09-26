$(document).ready(function () {
     //choose group leader
    $("#choose_leader").select2({ 
        allowClear: true,
        ajax: {
            method:"POST",
            url: "/admin/group/get_group_members",
            dataType: 'json',
            data: { 
                group_id:$("#group_id").val() //group id
            },
            processResults: function (res) { // construct search result to select2 formate
                return { 
                    results: $.map(res.data, function (obj) { 
                        obj.text = obj.text || obj.firstname+" "+obj.middlename+" "+obj.lastname; 
                        obj.id = obj.id || obj._id; 
                        return obj;
                    }),
                }
            },
            cache: true
        },
        placeholder: 'Search...',
    });
    // remove member from group
    $('.remove').on("click", function() {
        const leader = $(this);
        const leader_id = leader.attr("data-id");
        const group_id = $("#group_id").val();
        $.ajax({
           method:"POST",
           url:"/admin/group/remove_group_leader",
           data:{ 
              id:leader_id,
              group:group_id
           },
           dataType:"json",
           success: function(res){ 
            console.log(res);
            if(res.success){
              leader.parent().remove();
              toastr["info"](res.msg)
            }
           }
        })
    });
    // remove group meeting day
    $('.remove-day').on("click", function() {
        const meetingday = $(this);
        const day = meetingday.attr("data-id");
        const group_id = $("#group_id").val();
        $.ajax({
           method:"POST",
           url:"/admin/group/remove_meetingday",
           data:{ 
              day:day,
              group:group_id
           },
           dataType:"json",
           success: function(res){ 
            if(res.success){
              meetingday.parent().remove();
              toastr["info"](res.msg)
            }
           }
        })
    });
});