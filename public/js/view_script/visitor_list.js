$(document).ready(function () {
	// get all visitor
	allVisitor();
	function allVisitor() {
		$.ajax({
			method: "GET",
			url: "/admin/visitor/get_visitor",
			dataType: "json",
			success: function (res) {
				visitorTable(res.data)
			}
		})
	}
	// clear visitor per month results
	$("body").on("click", ".reset_btn", function () {
		allVisitor(); // reset visitor table
		$("#total").empty(); // remove total visitor
		$("#select-month")[0].reset(); // reset month field
		$("#reset_btn").empty(); // remove reset button
	})
	// get visitor per month
	$("#months").on("change", function () {
		const month = $(this).val();
		$.ajax({
			method: "POST",
			url: "/admin/visitor/get_visitors_per_month",
			data: {
				month: month
			},
			success: function (res) {
				const total_visitor = `<h4>Total Visitors: ${res.data.length}</h4>`;
				const reset_tlb = `<button class="btn btn-primary btn-sm reset_btn" id="viewall">View All</button>`;
				$("#reset_btn").html(reset_tlb);
				$("#total").html(total_visitor);
				visitorTable(res.data);
			}
		})
	})
	// Init datatable
	function visitorTable(data) {
		const dt = $("#visitor_table").DataTable({
			responsive: true,
			lengthChange: true,
			destroy: true,
			dom: 'lrtip',
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
			data: data,
			columns: [
				{
					data: "visit_date",
					render: function (data) {
						return moment(data).format("l")
					}
				},
				{ data: "name" },
				{ data: "gender" },
				{ data: "phone" },
				{ data: "email" },
				{ data: "address" },
				{ data: "note" },
			],
		})
		// search datatable
		$(".filter_table").keyup(function () {
			dt.search($(this).val()).draw();
		})
	}
	// send sms to group
	$("#sendsms").on("submit", function (e) {
		e.preventDefault();
		const sendsms = $(this);
		const submitBtn = $('#sendbtn');
		$.ajax({
			method: "POST",
			url: sendsms.prop("action"),
			data: sendsms.serialize(),
			dataType: "json",
			beforeSend: function () {
				submitBtn.prop("disabled", true);
				submitBtn.text("sending...");
			},
			success: function (res) {
				const validationErr = res.inputError;
				if (validationErr) {
					const form = $(".require"); // form inputs
					const fieldname = validationErr.field;
					const msg = validationErr.msginfo;
					// custom validation
					Validation(form, fieldname, msg)
				}
				if (res.status) {
					swal.fire({
						type: res.status,
						title: (res.status === "error") ? 'Oops...' : 'Sent',
						text: res.msg,
					}).then((result) => {
						sendsms[0].reset();
						$("#sms-modal").modal('hide');
					});
				}
			},
			complete: function () {
				submitBtn.prop("disabled", false);
				submitBtn.text("send");
			}
		})
	});
	clearInputError($('.require'));
});