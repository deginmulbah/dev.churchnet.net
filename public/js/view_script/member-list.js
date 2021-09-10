$(document).ready(function () {
    const list_table = $("#list_table");
    list_table.DataTable({
            responsive: true,
            // info: false,
            searching: false,
            lengthChange: false,
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
    })
});