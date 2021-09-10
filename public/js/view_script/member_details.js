$(document).ready(function () {
    // *********
    $("#search_member").submit(function (e) {
        e.preventDefault();
        const table_url = '/admin/member/search_member';
        const data = $(this).serialize()
        $('#result_card').removeClass('d-none')
        displayTable(table_url, data)
    });

    function displayTable(table_url, data) {
        $('#result_table').removeClass('d-none')
        const dt = $('#result_table').DataTable({
            responsive: true,
            destroy: true,
            info: false,
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
            ajax: {
                url: table_url,
                type: 'POST',
                data: {
                    search: data
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
                    const matches = fullname.match(/\b(\w)/g);
                    const initial = matches.join('')
                    return `<a class="d-flex align-items-center" href="/admin/member/view_details/${row['_id']}">
                    <div class="avatar-initial mr-3">
                    <span class="avatar-text bg-dark text-white rounded"><span class="initial-wrap"><span>${initial}</span></span>
                    </span>
                    </div>
                         <span>${fullname}</span>
                    </a>`
                    }
                },
                { data: "gender" },
                { data: "contact.email" },
                { data: "contact.phone1" },
                { data: "contact.address" },
            ],
        });
        $("#total_res").text(dt.data().length)
    };
});