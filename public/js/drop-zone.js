function readFile(input) { //read file input
  if (input.files && input.files[0]) {
    var reader = new FileReader(); 
    reader.onload = function (e) { //
      var htmlPreview =
        '<img width="200" class="profileImg" src="' + e.target.result + '" />';
      var wrapperZone = $(input).parent();
      var previewZone = $(input).parent().parent().find('.preview-zone');
      var boxZone = $(input).parent().parent().find('.preview-zone').find('.box').find('.box-body');
      wrapperZone.removeClass('dragover');
      previewZone.removeClass('d-none');
      boxZone.empty();
      boxZone.append(htmlPreview);
      var dropzoneWrapper = $('.dropzone-wrapper');
      var dropzoneDesc = $('.dropzone-desc')
      dropzoneWrapper.css({
        "height": "67px"
      });
      dropzoneDesc.css({ 
        "top": "8px"
      })
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function reset(e) {
  e.wrap('<form>').closest('form').get(0).reset();
  e.unwrap();
}
$(".dropzone").change(function () {
  readFile(this);
});
$('.dropzone-wrapper').on('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).addClass('dragover');
});
$('.dropzone-wrapper').on('dragleave', function (e) {
  e.preventDefault();
  e.stopPropagation();
  $(this).removeClass('dragover');
});
$('#remove-preview').on('click', function () { 
  var boxZone = $(this).parents('.preview-zone').find('.box-body'); // get preview container
  var previewZone = $(this).parents('.preview-zone'); 
  var dropzone = $(this).parents('.form-group').find('.dropzone'); // get file input
  boxZone.empty(); // remove image form preview
  var dropzoneWrapper = $('.dropzone-wrapper');
  var dropzoneDesc = $('.dropzone-desc')
  dropzoneWrapper.css({
    "height": "115px"
  }); // reset input field to normal height
  dropzoneDesc.css({ 
    "top": "30px"
  }) // reset input field to normal
  previewZone.addClass('d-none');
  reset(dropzone); // reset file input field
});