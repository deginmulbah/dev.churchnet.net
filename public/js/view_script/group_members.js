$(document).ready(function () {
	// global
	const dept_form = $("#dept_form"); 
	const listbox = $('#memberlist');
	// form wizard
	let _validator = dept_form.validate({ 
		errorClass: "is-invalid",
		rules:{ 
		    dept_name:{ 
				required: true,
			},
			dept_head:{ 
				required: true,
			},
			asst_head:{ 
				required: true,
			}
		},
		errorPlacement: function(error,element){
          error.insertAfter(element).addClass('.error');
        }
	})
	var _wizard = $('#wizard');
      _wizard.bootstrapWizard({
		onTabShow: function(tab ,navigation ,index){ 
          let counter = 0
          counter++ 
          if(counter === index){ // show submit button on last tab
            $('.button-finish').removeClass('d-none');
            $('.button-next').addClass('d-none');
          } else { 
            $('.button-finish').addClass('d-none');
            $('.button-next').removeClass('d-none');
          }
        },
        nextSelector: '.button-next',
        previousSelector: '.button-previous',
        finishSelector: '.button-finish',
        tabClass: 'nav nav-pills',
        // check if form is valid on next btn click
        onNext: function () {
          var _valid = dept_form.valid();
          if (!_valid) {
				_validator.focusInvalid();
				return false;
			}
        },
		 // check if form is valid on next tab click
		onTabClick: function (){ 
          var _valid = dept_form.valid();
          if (!_valid) {
            _validator.focusInvalid();
            return false;
          }
        },
		// submit from
		onFinish: function (){ 
			const data = $('#dept_form').serialize();
			$.ajax({
				method: "POST",
				url: "/admin/department/add_member_to_dept",
				data: data,
				dataType: "json",
				beforeSend: function(){ 
					$('.button-finish').prop('disabled' , true)
					$('.button-finish').find("i.la-save").hide()
					$('.button-finish').find("span").removeClass('d-none')
				},
				success: function (res) {
					toastr[res.msg](res.msginfo); // server response
					$('.required').val(null).trigger('click'); // clear selected value in selectbox
					const clearlistbox = listbox.bootstrapDualListbox('getContainer'); // clear selectd value in listbox
					clearlistbox.find(".removeall").trigger('click') // clear selectd value in listbox
					$('#wizard').find("#home").trigger('click');
					$("#group_model").modal('hide'); // dismiss bootstrap model
					dt.ajax.reload()
				},
				complete: function (){
					$('.button-finish').prop('disabled' , false)
					$('.button-finish').find("i.la-save").show()
					$('.button-finish').find("span").addClass('d-none')
				}
			});
		}
	});
	// Department listan table
	const dt = $("#group_table").DataTable({ 
		responsive: true,
        destroy: true,
		pageLength:6,
        language: {
			emptyTable: `<div>
			<img class="img-fluid" src="/images/file/folder-empty.svg" alt="data-not-found" width="100px"/>
				<p class="text-denger">No Record Found</p>
		    </div>`,
			paginate: {
				previous: '<span class="la la-angle-left"></span>',
				next: '<span class="la la-angle-right"></span>',
		    }
	  	},
		ajax:{ 
			url:"/admin/department/get_dept_info_all",
			method:"GET",
		},
		columns:[
			{ data:"dept_name"},
			{ 
				data:"dept_head",
				render: function(value){ 
					let val = []
					$.each(value, function(i, v){ 
						val.push(`${v['firstname']} ${v['middlename']}. ${v['lastname']}`)
					})
					return val
				}
			},
			{
				data:"dept_asst_head",
				render: function(value){ 
					let val = []
					$.each(value, function(i, v){ 
						val.push(`${v['firstname']} ${v['middlename']}. ${v['lastname']}`)
					})
					return val
				}
			},
			{
				data:"members",
				render:function(value){
					let val = [];
					$.each(value, function(i,v){ 
						val.push(v[i])
					})
					return (val.length == 0) ? '-' : val.length
				}
			},
			{ 
				data:"_id",
				render: function(data) {
                    return `<a href="#" data-edit="${data}" class="edit mr-2" id="edit" data-toggle="tooltip" data-placement="top" title="Edit"><i class="la la-pencil"></i></a>`
                },
				orderable: false,
				className: "dt-center",
			}
		]
	})
	$("#group_table").on('click','td a.edit', function () {
		$("#updata_group_model").modal('show');
		
	});
	// Select Department 
	const select_dept = $('.dept-name');
	const select_head = $('.dept-head');
	const select_asst_head = $('.dept-asst-head');
	$.ajax({
		method: "GET",
		url: "/admin/department/get_dept_without_member",
		dataType: "json",
		success: function (res) {
			if(res){ 
				const data = $.map(res.data, function (obj) { // construct json obj to select2 data formate
					obj.text = obj.text || obj.dept_name; 
				obj.id = obj.id || obj._id; 
				return obj;
				});
				select_dept.select2({ // populate data to select2
					dropdownParent: $('#group_model'),
					placeholder: "Select Department",
					allowClear: true,
					data:data
				});
			}
		}
	})
	// select department head
	select_head.select2({ 
		dropdownParent: $('#group_model'),
		allowClear: true,
		ajax: {
			url: "/admin/member/search_member_info",
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
		placeholder: 'Select head',
		minimumInputLength: 3,
	});
	// select department asst head
	select_asst_head.select2({ 
		dropdownParent: $('#group_model'),
		allowClear: true,
		ajax: {
			url: "/admin/member/search_member_info",
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
		placeholder: 'Select asst head',
		minimumInputLength: 3,
	})
	//init duallistbox 
	listbox.bootstrapDualListbox({
		filterPlaceHolder:"Search member...",
		filterOnValues:true
	});
	// config duallistbox default settings  
	const duallistboxSetting = listbox.bootstrapDualListbox('getContainer');
	duallistboxSetting.find(".moveall").remove()
	// duallistboxSetting.find(".removeall").remove()
	duallistboxSetting.find(".box2 .info-container").text("Remove Members from department")
	duallistboxSetting.find(".box1 .info-container").text("Add Members to department")
	// get all members 
	$.getJSON("/admin/member/get_members").done(function (data) { 
		$('#memberlist').empty()
		$.each(data.members, function (i, item) { 
			const listOpt = `<option value="${item._id}">${item.firstname} ${item.middlename} ${item.lastname}</option>` // display members in dual list box
			$('#memberlist').append(listOpt)
		});
			$('#memberlist').bootstrapDualListbox('refresh' , true) // refresh duallistbox
	});
});