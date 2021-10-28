// *******************************
//  membership form 
// *******************************
$(document).ready(function () {
  // select group
  $('.group').select2({
    // general member search input field
    allowClear: true,
    ajax: {
      url: "/admin/group/search_query",
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term, // search term
        };
      },
      processResults: function (res) { // construct search result to select2 formate
        return {
          results: $.map(res.data, function (obj) {
            obj.text = obj.text || obj.group_name;
            obj.id = obj.id || obj._id;
            return obj;
          }),
        }
      },
      cache: true
    },
    placeholder: 'Search...',
    minimumInputLength: 1,
  });
  // 
  $("#member_form").submit(function (e) {
    e.preventDefault();
    const member_id = $("#member_id").val();
    const form_url = $(this).attr('data-url'); // form ation url
    const member_form_btn = $("#member_form_btn");
    const form = $("#member_form")[0]; // get form
    const data = new FormData(form);  // construct form data
    $.ajax({
      method: "POST",
      url: form_url,
      data: data,
      processData: false,
      enctype: 'multipart/form-data',
      contentType: false,
      cache: false,
      beforeSend: function () {
        NProgress.start();
        member_form_btn.prop('disabled', true);
      },
      success: function (res) {
        const action = res.action;
        const validationErr = res.inputError;
        //set validation error message
        if (validationErr) {
          const form = $("#member_form input"); // form inputs
          const fieldname = validationErr.field;
          const msg = validationErr.msginfo;
          // custom validation
          Validation(form, fieldname, msg)
        }
        //***member profile update
        if (action === 'update') {
          const status = res.status;
          const msg = res.msg;
          swal.fire({  // set response alert
            position: "center",
            type: status,
            title: msg,
            showConfirmButton: false,
            timer: 2900
          }).then(function () {
            location.reload();
            // window.location.href = `/admin/member/member_profile/${member_id}`
          })
        }
        //***add member details
        if (action === 'add') {
          const status = res.status;
          const msg = res.msg;
          swal.fire({
            position: "center",
            type: status,
            title: msg,
            showConfirmButton: false,
            timer: 2900
          }).then(function () {
            $("#member_form")[0].reset(); //reset form
            resetDropzone(); // reset dropzone
            $(window).scrollTop(0, 'smooth');// scroll page back to top
          })
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
    $(this).keyup(function (e) {
      $(this).removeClass('is-invalid').next().text("");
    })
  });
  function resetDropzone() {
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