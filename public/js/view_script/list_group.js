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
            {
                data: "group_name",
                render:function(data, type, row){
                return `<a class="d-flex align-items-center" href="/admin/group/group_details/${row['_id']}">
                        ${data}
                </a>`
             }
            },
            { 
                data: "leaders",
                render:function(value) {
                    let fullname;
                    $.each(value,function(i,item){ 
                        fullname = `<a class="d-flex align-items-center" href="/admin/member/member_profile/${item["_id"]}">
                            ${item["firstname"]} ${item["middlename"]} ${item["lastname"]} 
                        </a>`;
                    })
                    return fullname
                }
             },
            {
              data: "_id",
                render:function(data){
                return `<a class="d-flex align-items-center" href="/admin/member/member_profile/${data}">
                        edit
                </a>`
                }
            }
    ],
    })
    // search datatable
    $('#filter_table').keyup(function(){
        dt.search($(this).val()).draw()
    })
});