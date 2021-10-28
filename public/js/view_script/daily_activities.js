$(document).ready(function () {
    const addButton = $('.add_button'); //Add button selector
    const wrapper = $('.field_wrapper'); //Input field wrapper
    let counter = 0;
    $(addButton).click(function () {
        counter++
        const fieldHTML = `<div class="row"> 
                    <div class="form-group col-md-4">
                        <input type="text" class="form-control" name="name" id="name_${counter}">
                        <span class="error"></span>
                    </div>
                    <div class="form-group col-md-3">
                        <input type="text" class="form-control time" name="start" id="start_${counter}">
                        <span class="error"></span>
                    </div>
                    <div class="form-group col-md-3">
                        <input type="text" class="form-control time" name="end" id="end_${counter}">
                        <span class="error"></span>
                    </div>
                    <div class="form-group col-md-2 remove_button">
                        <butto type="button" class="btn btn-danger">remove</butto>
                    </div>
                </div>`;
        $(wrapper).append(fieldHTML); //Add field html
        // init timepicker
        $(".time").each(function () {
            initTimepicker($(this))
        });
        clearInputError($("#activitie .form-control"))
    });
    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function (e) {
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
    });
    initTimepicker('.time')
    function initTimepicker(ele) {
        $(ele).timepicker({
            defaultTime: false,
            appendWidgetTo: "body"
        });
    }
    // add activity
    $("#activitie").submit(function (e) {
        e.preventDefault();
        const form = $(this);
        const formInput = $("#activitie input");
        formInput.each(function (i, ele) {
            const inputEle = $(this).val();
            if (inputEle === "") {
                $(this).focus().addClass('is-invalid').next('span').text("This field is required");
            } else {
                $.ajax({
                    method: "POST",
                    url: $(form).attr("action"),
                    data: $(form).serialize(),
                    dataType: "json",
                    success: function (res) {
                        const validationErr = res.inputError;
                        if (validationErr) {
                            const form = $("#activitie .form-control"); // form inputs
                            const fieldname = validationErr.field;
                            const msg = validationErr.msginfo;
                            // custom validation
                            Validation(form, fieldname, msg)
                        } else if (res.success) {
                            toastr["info"](res.msg);
                            setTimeout(() => {
                                location.reload();
                            }, 300);
                        }
                    }
                });
            }
        });
    });
    // add activity to day modal
    $("body").on("click", ".add-activity", function () {
        const activity_id = $(this).parent().parent().parent().attr("data-id");
        const day = $(this).parent().parent().parent().attr("data-day");
        $("#addMoreActivity").modal("show");
        $("#modelLabel").text(day); // set modal title to day
        $("#activity_id").val(activity_id);
    });
    // edit daily activities
    $("body").on("click", ".edit-activity", function () {
        const activity_id = $(this).parent().parent().parent().attr("data-id");
        $.ajax({
            method: "post",
            url: "/admin/calander/edit_activity",
            data: {
                id: activity_id,
            },
            dataType: "json",
            success: function (res) {
                let activitiesField = '';
                const id = res._id;
                const day = res.day;
                const activities = res.activities;
                $("#updateday").val(day);
                $("#activityid").val(id);
                $("#updateLabel").html(day);
                for (let i = 0; i < activities.length; i++) {
                    const element = activities[i];
                    activitiesField += `<div class="row"> 
                    <div class="form-group col-md-4">
                        <label for="name${i}">Title</label>
                        <input type="text" class="form-control" name="name[]" id="name${i}" value="${element.name}"/>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="start${i}">Time Start</label>
                        <input type="text" class="form-control tiem" name="start[]" id="start${i}" value="${element.start}"/>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="end${i}">Time End</label>
                        <input type="text" class="form-control tiem" name="end[]" id="end${i}" value="${element.end}"/>
                    </div>
                </div>`
                }
                $("#field_container").html(activitiesField)
                $("#updateActivities").modal("show");
            }
        });
    });
    // remove daily activit
    $('body').on("click", ".remove-activity", function () {
        const activity_container = $(this).parent().parent().parent();
        const activity_id = $(this).parent().parent().parent().attr("data-id");
        const swalWithBootstrapButtons = swal.mixin({
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: true,
        })
        swalWithBootstrapButtons({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                $.post("/admin/calander/remove_activity", { id: activity_id }).done(function (data) {
                    if(data.success){ 
                        swalWithBootstrapButtons(
                            'Deleted!',
                            `${data.msg}`,
                            'success'
                        ).then((result) => { 
                            activity_container.remove();
                        })
                    }
                });
            } else if (
                result.dismiss === swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons(
                    'Cancelled',
                    'error'
                )
            }
        })
    });
    clearInputError($("#activitie .form-control"))
});