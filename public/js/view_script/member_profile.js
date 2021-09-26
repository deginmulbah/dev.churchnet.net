$(document).ready(function(){
  // init flatpickr
  const fp = flatpickr("#date-pickr",{
    position:'below',
    altInput: false,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    allowInput: true,
    defaultDate: "today",
    onChange: function(selectedDates, dateStr, instance){
      // remove validation error message
      $(".date-picker").removeClass('is-invalid').next().text(""); 
    },
    disable: [
      function(date) {
        // disable all dates that are lesser then current date
        let today = new Date();
        return (date > today);
      }
    ],
  });
  // init select2
  function initializeSelect2(select_element){ 
    select_element.select2({ 
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
  }
  //onload: call the above function 
  $(".search-member").each(function() {
    initializeSelect2($(this));
  });
  // select group
  $('.group').select2({
    allowClear: true,
    ajax: {
      url: "/admin/group/search_query",
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
            obj.text = obj.text || obj.group_name; 
            obj.id = obj.id || obj._id; 
            return obj;
          }),
        }
      },
      cache: true
      },
      placeholder: 'Search to add group...',
      minimumInputLength: 1,
  });
  // add member to group
  $('#add_to_group').click(function() {
    const member_id = $("#member_id").val();
    const group = $("#member_group").val();
    $.ajax({
       method:"Post",
       url:"/admin/member/add_member_group",
       data:{ 
          id:member_id,
          group:group
       },
       dataType:"json",
       success: function(res){ 
        if(res.success){
           window.location.href = `/admin/member/member_profile/${member_id}`
        }
       }
    })
  })
  // remove member from group
  $('.remove').on("click", function() {
    const li_ele = $(this);
    const group_id = li_ele.attr("data-id");
    const member_id = $("#member_id").val();
    $.ajax({
       method:"Post",
       url:"/admin/member/remove_group",
       data:{ 
          id:member_id,
          group:group_id
       },
       dataType:"json",
       success: function(res){ 
        if(res.success){
          li_ele.parent().remove();
        }
       }
    })
  });
  //add/update member giving
  $("#member_giving").submit(function(e) {
    e.preventDefault();
    const giving_form = $(this);
    $.ajax({ 
      method:"POST",
      url:giving_form.prop('action'),
      data:giving_form.serialize(),
      dataType:"json",
      beforeSend: function(){ 
        $("#saveGiving").prop('disabled',true);
        NProgress.start()
      },
      success: function(res) {
        const success = res.success; 
        const status = res.status;
        const action = res.action;
        const msg = res.msg;
        const validationErr = res.inputError;
        //set validation error message
        if(validationErr){
          const form = $("#member_giving input");
          const fieldname = validationErr.field;
          const msg = validationErr.msginfo;
          Validation(form, fieldname, msg)
        }
        if(success){ 
          giving_form[0].reset();
          $("#addGiving").modal('hide');
          getMemberGivings();
          getTotals();
        }
      },
      complete: function(){ 
        $("#saveGiving").prop('disabled',false);
        NProgress.done()
      }
    })
  });
  // clear validation error
  clearInputError($("#member_giving input"));
  // get member givings
  getMemberGivings();
  function getMemberGivings() {
  const id = $("#member_id").val();
  const dt = $("#giving_table").DataTable({
      responsive: true,
      destroy:true,
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
        url:"/admin/member/get_givings",
        type: 'POST',
        data:{id:id},
      },
      columns: [
        { 
          data: "date",
          render: function(data,type,row){
            return moment(data).format('l')
          }
        },
        { data: "category"},
        { data: "note"},
        { data: "check_number"},
        { 
          data: "amount",
          render: function(data,type,row) {
            return `${data} <a href="javascript:void(0)" id="edit-giving" class="action-icon edit pull-right" data-row-id="${row._id}"><i class="la la-edit"></i></a>
                    <a href="javascript:void(0)" id="delete-giving" class="action-icon delete pull-right" data-row-id="${row._id}"><i class="la la-trash-o"></i></a>`
          }
        },
      ],
  })
  // search datatable
 $("#filter_table").keyup(function(){ 
   dt.search($(this).val()).draw()
 })
}
// edit member giving
$("#giving_table").on("click" , ".edit", function () {
  const giving_id = $(this).attr("data-row-id"); // get giving row id
  $("#addGiving").modal('show'); // show giving entry model
  $("#member_giving").prop('action','/admin/member/update_giving'); // set form action to update
  // get givings row data
  $.ajax({
     method:"POST",
     url:"/admin/member/get_giving",
     data:{
      id:giving_id
     },
     success:function (res) {
      const data = res.data;
       if(data){ 
        // set form field value for update
        const giving_date = moment(data.date).format('l');
        fp.setDate(giving_date, true , "m/d/y")
        $("#giving_id").val(data._id);
        $("#amount").val(data.amount);
        $("#checkno").val(data.check_number);
        $("#note").text(data.note);
       }
     }
  })
});
// get givings totals
getTotals();
function getTotals() {
  const id = $("#member_id").val();
  $.ajax({ 
    method:"POST",
    url:"/admin/member/get_total",
    data:{id:id},
    success: function(res){
      const givingTotals = res.totals;
      let totals = []; // giving total par category
      let categories = "" ;  // giving categories
      if(givingTotals.length){
        $("#no-giving").addClass("d-none") // hide no result card
        $("#giving-card").removeClass("d-none"); // show giving table
        $("#giving-amount-total").removeClass("d-none"); // show giving totals
        givingTotals.forEach((element) => {
          totals.push(element.total);
          categories += `
           <li class=" d-flex justify-content-between align-items-center">
               ${element._id}
              <span class="ml-5">$${element.total}</span>
           </li>
          `
        })
        const total = totals.reduce((a , b) => a + b); // sum of all givings
        $("#categories-totals").html(categories); // list of giving categories
        $("#total").text('$' + total) // over all total giving
      } else {
        $("#giving-card").addClass("d-none"); // hide giving table
        $("#giving-amount-total").addClass("d-none"); // hide giving totals
        $("#no-giving").removeClass("d-none") // show no result card
      }
    }
  })
}
//reset form value on modal close
$("#addGiving").on("hidden.bs.modal" , function() {
  const today = moment().format('l');
  fp.setDate(today, true, "m/d/Y");
  $("#giving_id").val("");
  $("#amount").val("");
  $("#checkno").val("");
  $("#note").text("");
  $("#member_giving").prop("action" , "/admin/member/add_giving");
  // remove error message
  removeError($("#member_giving input"))
});
// delete alert
$("#giving_table").on("click", ".delete",function(){
  const giving_id = $(this).attr("data-row-id");
  const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true,
  })
  swalWithBootstrapButtons({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
       $.post("/admin/member/delete_giving",{ 
         id:giving_id,
       }, function (res) {
        swal.fire({
          title: 'Deleted!',
          text: "Your file has been deleted.",
          type:'success',
          showConfirmButton: false,
          timer: 1000
        }).then((result) => {   
          getMemberGivings();
          getTotals();
        })
      }
     );
    } else if (
      // Read more about handling dismissals
      result.dismiss === swal.DismissReason.cancel
    ) {
    }
  })
});
});  