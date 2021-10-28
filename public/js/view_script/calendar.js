/* ------------------------------------------------------------------------
     * Calendar
* ------------------------------------------------------------------------ */

$(document).ready(function () {
let events ;
$.get("/admin/calander/get_event",
    function (data, textStatus, jqXHR) {
      events = data
    },
);
var _calendar = $('#calendar');
  _calendar.fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultDate: new Date().now,
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    eventLimit: true, // allow "more" link when too many events
    events: events
});
});