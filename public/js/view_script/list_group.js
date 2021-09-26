$(document).ready(function () {
    const dt = $("#group_list").DataTable({
        responsive: true,
        lengthChange: true,
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
        ajax: {
            url: "/admin/group/get_groups",
            type: 'GET',
        },
        columns: [
            {data: "group_name",
                render:function(data, type, row){
                return `<a class="d-flex align-items-center" href="/admin/group/group_details/${row['_id']}">
                        ${data}
                    </a>`
            }},
            { data: "created_at",
                render:function (data) {
                    return moment(data).format('l');
            }}
    ],
    })
    // search datatable
    $('#filter_table').keyup(function(){
        dt.search($(this).val()).draw()
    })
});