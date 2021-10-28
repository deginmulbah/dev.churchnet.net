$(document).ready(function () {
    const dt = $("#result_table").DataTable({
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
                        <div class="avatar avatar-sm bg-primary mr-3 user-initial-sm">
                            <span class="avatar-name">${row['initial']}</span>
                        </div>
                     <span>${fullname}</span>
                </a>`
             }
            },
            { data: "gender" },
            { 
                data: "contact.primaryemail",
                render: function (data, type , row) { 
                    return (data) ? data : "N/A"
                } 
            },
            { 
                data: "contact.primarynumber",
            },
            { 
                data: "_id",
                render: function(data,type,row) {
                    return `<a href="javascript:void(0)" id="delete-giving" class="action-icon giving pull-right" data-row-id="${data}"><i class="la la-money"></i></a>`
                }
            },
        ]
    })
    // search datatable
    $('#filter_table').keyup(function(){
        dt.search($(this).val()).draw()
    })
});