$(document).ready(function () {
	// get departments
	const dt =  $('#group_table').DataTable({ 
		responsive: true,
        destroy: true,
		pageLength:6,
		searching:false,
		lengthChange: false,
        language: {
        emptyTable: `<div>
						<img class="img-fluid" src="/images/file/no-results.svg" alt="data-not-found" width="100px"/>
							<p class="text-denger">No Record Found</p>
					</div>`,
        paginate: {
            previous: '<span class="la la-angle-left"></span>',
            next: '<span class="la la-angle-right"></span>',
        }},
	})
});