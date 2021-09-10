$(document).ready(function () {
    const church_setup = $("#church_setup");
    const submitBtn = $("#submitBtn");
    const upload_logo = $("#upload_logo");
    checkformValue()
    function checkformValue() {
        $(".requireField").each(function () {
            if ($(this).val() !== "") {
                church_setup.prop("action", "/admin/general_setup/update_setup");
                church_setup.prop("method", "POST");
                submitBtn.text("Save Changes");
            } else {
                church_setup.prop("action", "/admin/general_setup/add_setup");
                church_setup.prop("method", "POST");
            }
        });
    }
    // upload logo
    upload_logo.on("submit", function (e) {
        e.preventDefault();
        const upload_btn = $("#upload_btn");
        const upload_spinner = $("#upload_spinner");
        const upload_card = $("#upload_card");
        const loader = $("#loader")
        $.ajax({
            method: "POST",
            url: "/admin/general_setup/uoload_logo",
            data: new FormData(this),
            dataType: "json",
            contentType: false,
            processData: false,
            beforeSend: function () {
                NProgress.start();
                upload_btn.prop("disabled", true);
                upload_spinner.removeClass('d-none');
                upload_card.addClass('spinner-overlay');
                loader.removeClass('d-none')
            },
            success: function (res) {
                if (res) {
                    toastr[res.msg](res.msgtxt)
                }
            },
            complete: function () {
                NProgress.done();
                upload_btn.prop("disabled", false);
                upload_spinner.addClass('d-none');
                upload_card.removeClass('spinner-overlay');
                loader.addClass('d-none')
            },
        });
    });
});
var preview_img = function (event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};