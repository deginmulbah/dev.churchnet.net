$(document).ready(function () {
    const dt = $("#list_table").DataTable({
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
            url: "/admin/member/get_members",
            type: 'GET',
        },
        columns: [
            {
                data: "firstname",
                render:function(data, type, row){
                const fullname = `${data} ${row['middlename']} ${row["lastname"]}`;
                return `<a class="d-flex align-items-center" href="/admin/member/member_profile/${row['_id']}">
                <div class="avatar-initial mr-3">
                <span class="avatar-text bg-dark text-white rounded"><span class="initial-wrap"><span>${row['initial']}</span></span>
                </span>
                </div>
                     <span>${fullname}</span>
                </a>`
             }
            },
            { data: "gender" },
            { data: "contact.primaryemail" },
            { data: "contact.primarynumber" },
    ],
    })
    // search datatable
    $('#filter_table').keyup(function(){
        dt.search($(this).val()).draw()
    })
});