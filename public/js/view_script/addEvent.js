$(document).ready(function () {
    $("#event").submit(function (e) {
        e.preventDefault();
        const form = $(this);
        const formInput = $("#event input");
        formInput.each(function (i, ele) {
            const inputEle = $(this).val();
                $.ajax({
                    method: "POST",
                    url: $(form).attr("action"),
                    data: $(form).serialize(),
                    dataType: "json",
                    success: function (res) {
                        const validationErr = res.inputError;
                        if (validationErr) {
                            const form = $("#event .form-control"); // form inputs
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
        });
    });
    
    clearInputError($("#event .form-control"))
});