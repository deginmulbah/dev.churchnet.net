// add department or group
$(document).ready(function () {
	//choose group leader
	const leaders = $("#group_leader").select2({ 
		allowClear: true,
		ajax: {
			url: "/admin/member/search_query",
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
						obj.text = obj.text || obj.firstname+" "+obj.middlename+" "+obj.lastname; 
						obj.id = obj.id || obj._id; 
						return obj;
					}),
				}
			},
			cache: true
		},
		placeholder: 'Search...',
		minimumInputLength: 3,
	});
	// choose meeting days
	const meetingday = $("#meetingday").select2({ 
		placeholder: 'Select Days',
	})
	// add group
	$("#group").submit(function(e){ 
		e.preventDefault();
		const group_details = $(this).serialize();
		$.ajax({
			url: "/admin/group/save_group",
			method:"POST",
			data:group_details,
			success: function(res){ 
				const inputError =  res.inputError; //invalid input response
				const info = res.info; // success  response
				// validation error
				if(inputError){ 
					$(".require").each(function(i , element){ 
						if(inputError.field === element.name ){ 
							$(this).addClass('is-invalid').focus().next('.error').text(inputError.msginfo)
						}
					})
				}
				//submmision success
				if (info) {
		          const status = info.status;
		          const msg = info.msg;
		          swal({  // set response alert
		            position: "center",
		            type: status,
		            title: msg,
		            showConfirmButton: false,
		            timer: 2900
		          })
		          $("#group")[0].reset(); //reset form
		          $("#editor-demo1").val(""); //reset editor
		          $(window).scrollTop(0,'smooth');// scroll page back to top
				}
			}
		});
	});
	// remove validation error on keyup
	$(".require").each(function(i , element){
		$(this).keyup(function(){
			$(this).removeClass('is-invalid').next('.error').text("");
		})
	});
});