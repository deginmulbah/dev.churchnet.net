$(document).ready(function() {
   $("#visitor_form").submit(function(e) {
   		e.preventDefault();
   		const visitor_form = $(this);
   		$.ajax({
   			method:"POST",
            data:visitor_form.serialize(),
   			url:"/admin/visitor/save_visitor",
   			dataType:"json",
            beforeSend: function() {
                $("#save_visitor").prop("disabled", true);
                NProgress.start();
            },
   			success:function (res) {
               console.log(res)
   			   const validationErr = res.inputError;
               const success = res.success;
               if(validationErr){ 
                    const formInputs = $("#visitor_form input");
                    const fieldname =  validationErr.field;
                    const errmsg = validationErr.msginfo;
                    Validation(formInputs,fieldname,errmsg)
                }
                if(success){ 
                    const status = res.status;
                    const msg = res.msg;
                    swal.fire({
                        position: "center",
                        type: status,
                        title: msg,
                        showConfirmButton: false,
                        timer: 2900
                    }).then(function() {
                        $("#visitor_form")[0].reset();
                        $("#visitor_form textarea").val("")
                    })
                }
   			},
            complete:function() {
                $("#save_visitor").prop("disabled", false);
                NProgress.done();
            }
   		})
   })
   clearInputError($("#visitor_form input"))
})