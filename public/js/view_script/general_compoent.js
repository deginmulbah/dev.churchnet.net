$(document).ready(function () {
  const dt = $(".table_wrapper").DataTable({
        responsive: true,
        dom:'lrtip',
        language: {
            emptyTable: `<div>
					<img class="img-fluid" src="/images/file/no-results.svg" alt="data-not-found" width="100px"/>
					<p class="text-denger">No Record Found</p>
				</div>`,
            paginate: {
                previous: '<span class="la la-angle-left"></span>',
                next: '<span class="la la-angle-right"></span>',
            }
        },
    });
    // search datatable
    $('#filter_table').keyup(function(){
        dt.search($(this).val()).draw()
    });
// general member search input field
$(".search-member").select2({ 
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
//
$(".select").select2({
	placeholder: 'select',
});
});