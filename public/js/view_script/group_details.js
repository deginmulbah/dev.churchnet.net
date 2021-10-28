$(document).ready(function () {
    //choose group leader
    $("#choose_leader").select2({
        allowClear: true,
        ajax: {
            method: "POST",
            url: "/admin/group/get_group_members",
            dataType: 'json',
            data: {
                group_id: $("#group_id").val() //group id
            },
            processResults: function (res) { // construct search result to select2 formate
                return {
                    results: $.map(res.data, function (obj) {
                        obj.text = obj.text || obj.firstname + " " + obj.middlename + " " + obj.lastname;
                        obj.id = obj.id || obj._id;
                        return obj;
                    }),
                }
            },
            cache: true
        },
        placeholder: 'Search...',
    });
    // remove group leaders
    $('.remove').on("click", function () {
        const leader = $(this);
        const leader_id = leader.attr("data-id");
        const group_id = $("#group_id").val();
        $.ajax({
            method: "POST",
            url: "/admin/group/remove_group_leader",
            data: {
                id: leader_id,
                group: group_id
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.success) {
                    leader.parent().remove();
                    toastr["info"](res.msg)
                }
            }
        })
    });
    // remove group member
    $('body').on("click", ".delete", function () {
        const member = $(this);
        const member_id = member.attr("data-id");
        const group_id = $("#group_id").val();
        $.ajax({
            method: "Post",
            url: "/admin/group/remove_member",
            data: {
                id: member_id,
                group: group_id
            },
            dataType: "json",
            success: function (res) {
                if (res.success) {
                    toastr["error"](res.msg)
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            }
        })
    });
    // remove group meeting day
    $('.remove-day').on("click", function () {
        const meetingday = $(this);
        const day = meetingday.attr("data-id");
        const group_id = $("#group_id").val();
        $.ajax({
            method: "POST",
            url: "/admin/group/remove_meetingday",
            data: {
                day: day,
                group: group_id
            },
            dataType: "json",
            success: function (res) {
                if (res.success) {
                    meetingday.parent().remove();
                    toastr["info"](res.msg)
                }
            }
        })
    });
    // send sms to group
    $("#sendsms").on("submit", function (e) {
        e.preventDefault();
        const sendsms = $(this);
        const submitBtn = $('#sendbtn');
        $.ajax({
            method: "POST",
            url: sendsms.prop("action"),
            data: sendsms.serialize(),
            dataType: "json",
            beforeSend: function () {
                submitBtn.prop("disabled", true);
                submitBtn.text("sending...");
            },
            success: function (res) {
                const validationErr = res.inputError;
                if (validationErr) {
                    const form = $(".require"); // form inputs
                    const fieldname = validationErr.field;
                    const msg = validationErr.msginfo;
                    // custom validation
                    Validation(form, fieldname, msg)
                }
                if (res.status) {
                    swal.fire({
                        type: res.status,
                        title: (res.status === "error") ? 'Oops...' : 'Sent',
                        text: res.msg,
                    }).then((result) => {
                        sendsms[0].reset();
                        $("#sms-modal").modal('hide');
                    });
                }
            },
            complete: function () {
                submitBtn.prop("disabled", false);
                submitBtn.text("send");
            }
        })
    });
    clearInputError($('.require'));
});