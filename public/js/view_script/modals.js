// giving modal
$("#result_table").on("click" , ".giving", function () {
        $("#addGiving").modal('show'); // show giving entry model
         // get member id and set it to input field
        const member_id =  $(this).attr("data-row-id");
        $("#member_id").val(member_id);

});
//reset form value on modal close
$("#addGiving").on("hidden.bs.modal" , function() {
  // remove error message
  removeError($("#member_giving input"));
  $("#member_giving")[0].reset();
});
// collect givings
$("#member_giving").submit(function(e) {
        const giving_form = $(this);
        e.preventDefault();
        $.ajax({ 
              method:"POST",
              url:"/admin/member/add_giving",
              data:$(this).serialize(),
              dataType:"json",
              beforeSend: function(){ 
                $("#saveGiving").prop('disabled',true);
              },
              success: function(res) {
                const success = res.success; 
                const status = res.status;
                const action = res.action;
                const msg = res.msg;
                const validationErr = res.inputError;
                //set validation error message
                if(validationErr){
                  const form = $("#member_giving input");
                  const fieldname = validationErr.field;
                  const msg = validationErr.msginfo;
                  Validation(form, fieldname, msg)
                }
                if(success){
                  console.log(res);
                  giving_form[0].reset();
                  $("#addGiving").modal('hide');
                  toastr["info"](res.msg)
                }
              },
        complete: function(){ 
        $("#saveGiving").prop('disabled',false);
      }
    })
});
// clear validation error
clearInputError($("#member_giving input"));