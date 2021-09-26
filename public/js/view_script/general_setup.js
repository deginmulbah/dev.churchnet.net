$(document).ready(function () {
    const church_setup = $("#church_setup");
    const submitBtn = $("#submitBtn");
    const upload_logo = $("#upload_logo");
    checkformValue();
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
 });
// preview
var preview_img = function (event) {
    var output = document.getElementById('output');
    console.log(output);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
};