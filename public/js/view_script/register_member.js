$(document).ready(function () {
    $('.group').select2()
    // Globe variables
    let _wizard_02 = $('#wizard-02');
    let member_form = $('#member_form');
    const button_finish = $(".button-finish");
    // validata form value
    if (_wizard_02.exists()) {
        let _validator = member_form.validate({
        errorClass: "is-invalid",
        rules: {
          first_name: {
            required: true,
            minlength: 2
          },
          last_name: {
            required: true,
            minlength: 2
          },
          birthdate: {
            required: true,
          },
          gender: {
            required: true,
          },
          nationality:{ 
            required: true,
          },
          occupation:{ 
            required: true,
          },
          mstatus:{ 
            required: true,
          },
          address:{ 
            required: true,
          },
          email:{ 
            email:true
          },
          phoneno1:{ 
            required:true,
            minlength:10
          },
          phoneno2:{ 
            required:true,
            minlength:10
          },
        },
        errorPlacement: function(error,element){
          error.appendTo(element.next('.error'));
        }
      });
     // form wizard 
      _wizard_02.bootstrapWizard({
        onTabShow: function(tab ,navigation ,index){ 
          let counter = 1 
          counter++ 
          if(counter === index){ // show submit button on last tab
            $('.button-finish').removeClass('d-none');
            $('.button-next').addClass('d-none');
          } else { 
            $('.button-finish').addClass('d-none');
            $('.button-next').removeClass('d-none');
          }
        },
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        'finishSelector': '.button-finish',
        'tabClass': 'nav nav-pills',
        // check if form is valid on next btn click
        onNext: function () {
          var _valid = member_form.valid();
          if (!_valid) {
            _validator.focusInvalid();
            return false;
          }
        },
        // check if form is valid on next tab click
        onTabClick: function (){ 
          var _valid = member_form.valid();
          if (!_valid) {
            _validator.focusInvalid();
            return false;
          }
        },
        // submit form data to server
        onFinish: function(){ 
            submitData();
            $('.wizard').find("#home").trigger('click');
        },
      });
    }
    //submit form data to server
    function submitData (){
      $.ajax({
        method: "POST",
        url: member_form.prop('action'),
        data: member_form.serialize(),
        dataType: "json",
        beforeSend: function () {
            NProgress.start();
            button_finish.prop('disabled' , true).find("span").removeClass('d-none');
        },
        success: function (res) {
            if(res){ 
                toastr[res.msg](res.msginfo);
                member_form[0].reset();
            }
            if(res.action == "update"){ // if action is update reload page
                setTimeout(function(){
                    location.reload(); 
                }, 5000); 
            }
        },
        complete: function (){ 
            NProgress.done();
            button_finish.prop('disabled' , false).find("span").addClass('d-none');
		}
      });
    }
    // set form action attribution
    $(".required").each(function () { 
        if($(this).val() !== "") {  // check required form field
            member_form.prop("action","/admin/member/update_member_profile");
            member_form.prop("method", "POST");
        } else { 
            member_form.prop("action", "/admin/member/save_member");
            member_form.prop("method", "POST");
        }
    });
});