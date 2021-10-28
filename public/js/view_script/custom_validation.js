// custom validation function
function Validation(form_name , field_name ,msg) {
   	form_name.each(function (index, element) {
       if(field_name === element.name){
        	// add error msg to flatpickr
        	if(element.type === "hidden") { 
               $(this).next().focus().addClass('is-invalid').next('span').text(msg);
        	}
        	if(element.type === "radio"){ 
        	    $("#radioerr").text(msg);
        	}
           $(this).focus().addClass('is-invalid').next('span').text(msg);
        }
    });
}
// clear error message on keyup
function clearInputError(form_name) {
	form_name.each(function (index, element) {
		if(element.localName ==="input"){
			$(this).keyup(function(e) { 
				$(this).removeClass('is-invalid').next().text("");
			})
		} else if(element.localName === "select"){
			$(this).change(function(e) { 
				$(this).removeClass('is-invalid').next().text("");
			})
		}
	});
}
// 
function removeError(form_name) {
	form_name.removeClass('is-invalid').next('span').text(" ");
}