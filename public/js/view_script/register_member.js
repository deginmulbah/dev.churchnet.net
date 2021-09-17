// *******************************
//  membership form 
// *******************************
$(document).ready(function () {
  // select group
  $('.group').select2({});

  $("#member_form").submit(function (e) {
    e.preventDefault();
    const member_form_btn = $("#member_form_btn");
    const form = $("#member_form")[0]; // get form
    const data = new FormData(form);  // construct form data
    $.ajax({
      method: "POST",
      url: "/admin/member/save_member",
      data:data,
      processData: false,
      enctype: 'multipart/form-data',
      contentType: false,
      cache: false,
      beforeSend: function () {
        NProgress.start();
        member_form_btn.prop('disabled', true);
      },
      success: function (res) {
      //get validation response
        if(res.inputError){
          $("#member_form input").each(function (index, element) { //set error mgs
            const fieldname = res.inputError.field;
            const msg = res.inputError.msginfo;
            // if(fieldname === 'gender'){ 
            //    $(this).focus().addClass('is-invalid');
            //    $('.gerror').text(msg);
            // }
            if(fieldname === element.name){ 
               $(this).focus().addClass('is-invalid').next('span').text(msg);
            }
          });
        }
        // check status
        if(res.info){
          const status = res.info.status;
          const msg = res.info.msg;
          swal({  // set response alert
            position: "center",
            type: status,
            title: msg,
            showConfirmButton: false,
            timer: 2900
          })
          $("#member_form")[0].reset(); //reset form
          resetDropzone(); // reset dropzone
          $(window).scrollTop(0,'smooth');// scroll page back to top
        }
      },
      complete: function () { 
        NProgress.done();
        $("#member_form_btn").prop('disabled', false);
      }
    });
  });
  // clear error message
  $("#member_form input").each(function (index, element) {
    $(this).keyup(function(e) { 
        $(this).removeClass('is-invalid').next().text("");
    })
  });
  function resetDropzone(){ 
    var boxZone = $(".box-body"); // get preview container
    var previewZone = $('.preview-zone'); 
    boxZone.empty(); // remove image form preview
    var dropzoneWrapper = $('.dropzone-wrapper');
    var dropzoneDesc = $('.dropzone-desc');
    dropzoneWrapper.css({
      "height": "115px"
    }); // reset input field to normal height
    dropzoneDesc.css({ 
      "top": "30px"
    }) // reset input field to normal
    previewZone.addClass('d-none');
  }
});