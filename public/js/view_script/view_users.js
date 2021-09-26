$(document).ready(function () {
    const user_table = $("#users_table");
    user_table.DataTable({
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
        }},
        ajax: {
            method:"GET",
            url: "/admin/user/get_users",
        },
        columns: [
        { data: "fname" },
        { data: "mname" },
        { data: "lname" },
        { data: "role" },
        { data: "username"},
        { data: "phone" },
        {
            data: "status",
            render:	function (data) { 
                if(data === 'active') {
                    return `<p><i class="fa fa-circle text-success mr-2"></i>${data}</p>`
                }
                if(data === 'suspended'){ 
                    return `<p><i class="fa fa-circle text-danger mr-2"></i>${data}</p>`
                }
            }
        },
        {
            data: "dob",
            render: function(data) { 
                return moment(data).format('l');
            }
        },
        { 
            data: "_id",
            render: function(data) {
                return `<a href="/admin/user/view_user_profile/${data}" class="mr-2"><i class="la la-eye"></i></a> 
                        <a href="/admin/user/edit_user_account/${data}"><i class="la la-pencil"></i></a>`
            }
        },
    ],
    });
});