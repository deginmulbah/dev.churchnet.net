$(document).ready(function () {
    // **** search member 
    $("#search_member").submit(function (e) {
        e.preventDefault();
        const table_url = '/admin/member/search_member';
        const data = $("#search").serialize();
        $('#result_card').removeClass('d-none');
        displayTable(table_url,data)  //display result table
    });
    // *** display table
    function displayTable(table_url,data) {
        $('#result_card').removeClass('d-none'); //show search result table
        const dt = $('#result_table').DataTable({
            responsive: true,
            destroy: true,
            dom:'lrtip',
            info: false,
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
            ajax: {
                url: table_url,
                type: 'POST',
                data:{ 
                    data: data,
                },
                beforeSend: function () {
                    $("#search_member").prop('disabled',true);
                    $("#submit_search").addClass('d-none')
                },
                complete: function () {
                    $(".search_loader").addClass('d-none');
                    $("#submit_search").removeClass('d-none');
                }
            },
            columns: [
            {
                data: "firstname",
                render:function(data, type, row){
                const fullname = `${data} ${row['middlename']} ${row["lastname"]}`;
                return `<a class="d-flex align-items-center" href="/admin/member/member_profile/${row['_id']}">
                 <div class="avatar avatar-sm bg-primary mr-1 initial-sm">
                    <span class="avatar-name">${row['initial']}</span>
                 </div>
                     <span>${fullname}</span>
                </a>`
             }
            },
            { data: "gender" },
            { data: "contact.primaryemail" },
            { 
                data: "contact.primarynumber",
                render: function(data,type,row) {
                    return `${data} <a href="javascript:void(0)" id="edit-giving" class="action-icon edit pull-right" data-row-id="${row._id}"><i class="la la-envelope-o"></i></a>
                    <a href="javascript:void(0)" id="delete-giving" class="action-icon giving pull-right" data-row-id="${row._id}"><i class="la la-money"></i></a>`
            },
            },
        ],
        });
    };
});