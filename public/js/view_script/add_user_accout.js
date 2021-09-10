$(document).ready(function () {
    const btn_submit = $("#btn_submit")
    const spinner = $("#spinner")
    $("#adduser").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/admin/user/add_user",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function (){ 
                NProgress.start();
                btn_submit.prop('disabled', true);
                spinner.removeClass('d-none');
            },
            success: function (res) {
                validate_input (res)
                if(res.msg){ 
                    toastr[res.msg](res.msgtxt)
                    $("#adduser")[0].reset()
                }
            },
            complete : function (){ 
                NProgress.done();
                btn_submit.prop('disabled', false)
                spinner.addClass('d-none');
            }
        });
    });
    function validate_input (res) {
        $('.require').each(function (i, value) { 
            const inputfield = res.field;
            if(value.name == inputfield){ 
                $(this).addClass('is-invalid').next().text(res.msginfo);
        }
    });
  }
  $(".require").keyup(function (e) { 
    $(this).removeClass('is-invalid').next().text('');
  });
});