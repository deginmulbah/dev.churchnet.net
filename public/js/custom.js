/* ----------------------------------
  Script
-------------------------------------
    01. SidebarMenu
    02. Nicescrollbar
    03. Popover tooltip tooltip
    04. Zmdi minus
    05. Sortable
    06. ShowLeft
    07. Chart chartjs 
    8.  Wizard
    9.  Map Vactor
    10. Morris
    11. Nestable
    12. Peity
    13. Rangeslider
    14. Summernote
    15. TouchSpin
    16. Google Map
    17. Calendar
    18. NProgres
    19. flatpickr
*/
(function ($) {
  'use strict'; // Start of use strict
  $(document).ready(function () {
    /* ------------------------------------------------------------------------
     * SidebarMenu
     * ------------------------------------------------------------------------ */
    $.sidebarMenu = function (menu) {
      var _animationSpeed = 300,
        _subMenuSelector = '.sidebar-submenu';

      $(menu).on('click', 'li a', function (e) {
        var _this = $(this);
        var _checkElement = _this.next();

        if (_checkElement.is(_subMenuSelector) && _checkElement.is(':visible')) {
          _checkElement.slideUp(_animationSpeed, function () {
            _checkElement.removeClass('menu-open');
          });
          _checkElement.parent('li').removeClass('active');
        } else if ((_checkElement.is(_subMenuSelector)) && (!_checkElement.is(':visible'))) { //If the menu is not visible
          //Get the parent menu
          var _parent = _this.parents('ul').first();
          //Close all open menus within the parent
          var _ul = _parent.find('ul:visible').slideUp(_animationSpeed);
          //Remove the menu-open class from the parent
          _ul.removeClass('menu-open');
          //Get the parent li
          var _parent_li = _this.parent('li');

          //Open the target menu and add the menu-open class
          _checkElement.slideDown(_animationSpeed, function () {
            //Add the class active to the parent li
            _checkElement.addClass('menu-open');
            _parent.find('li.active').removeClass('active');
            _parent_li.addClass('active');
          });
        }
        //if this isn't a link, prevent the page from being redirected
        if (_checkElement.is(_subMenuSelector)) {
          e.preventDefault();
        }
      });
    }

    $.sidebarMenu($('.sidebar-menu'));

    jQuery.fn.exists = function () { return this.length > 0; }

    /* ------------------------------------------------------------------------
     * nicescrollbar
     * ------------------------------------------------------------------------ */
    var _nicescrollbar = $('.nicescrollbar');
    if (_nicescrollbar.exists()) {
      _nicescrollbar.each(function () {
        var _height = $(this).data('height');
        $(this).css({ 'height': _height });
      });
      $('.nicescrollbar').niceScroll({
        cursorcolor: '#f0f1f6',
        cursorwidth: '8px',
        autohidemode: true,
        scrollspeed: 60
      });
    }

    /* ------------------------------------------------------------------------
     * popover tooltip tooltip
     * ------------------------------------------------------------------------ */
    $(function () {
      $('[data-toggle="popover"]').popover({
        trigger: 'hover'
      })
    });

    $('.popover-dismiss').popover({
      trigger: 'focus'
    });

    $(function () {
      $('[data-tips="tooltip"]').tooltip({
         trigger: 'hover'
      })
    });

    /* ------------------------------------------------------------------------
     * zmdi minus
     * ------------------------------------------------------------------------ */
    var _zmdiminus = $('.zmdi-minus');
    if (_zmdiminus.exists()) {
      _zmdiminus.click(function () {
        // $( this ).switchClass( 'zmdi-minus', 'zmdi-plus', 500, 'easeInOutQuad' );
        _zmdiminus.toggleClass('zmdi-minus zmdi-plus');
        $('#card-body-toggle').slideToggle();
      });
    }

    var _zmdiclose = $('.zmdi-close');
    if (_zmdiclose.exists()) {
      _zmdiclose.click(function () {
        $('.parent-div').remove();
      });
    }

    /* ------------------------------------------------------------------------
     * sortable
     * ------------------------------------------------------------------------ */
    var _sortable = $('#sortable1');
    if (_sortable.exists()) {
      _sortable.sortable({
        connectWith: '.connectedSortable'
      }).disableSelection();
    }

    /* ------------------------------------------------------------------------
     * showLeft
     * ------------------------------------------------------------------------ */
    $('#showLeft').click(function () {
      $('.animate-menu-left').toggleClass('animate-menu-open');
    });

    $('#showRight').click(function () {
      $('.animate-menu-right').toggleClass('animate-menu-open');
    });

    $('.side-toggle').click(function () {
      $('.wrapper').toggleClass('sidebar-panel-collapse');
      $(".nicescrollbar").getNiceScroll().resize();
    });

    $('.sidebar-panel').hover(function () {
      $(".nicescrollbar").getNiceScroll().resize();
    });

    /* ------------------------------------------------------------------------
     * chart chartjs 
     * ------------------------------------------------------------------------ */
    /* bar-chart */
    var _chartjsbar = $('#bar-chart');
    if (_chartjsbar.exists()) {
      new Chart(_chartjsbar, {
        type: 'bar',
        data: {
          labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
          datasets: [
            {
              label: 'Population (millions)',
              backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
              data: [2478, 5267, 734, 784, 433]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });
    }
    /* Line chart */
    var _chartjsline = $('#line-chart');
    if (_chartjsline.exists()) {
      new Chart(_chartjsline, {
        type: 'line',
        data: {
          labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
          datasets: [{
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: 'Africa',
            borderColor: '#3e95cd',
            fill: false
          }, {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: 'Asia',
            borderColor: '#8e5ea2',
            fill: false
          }, {
            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
            label: 'Europe',
            borderColor: '#3cba9f',
            fill: false
          }, {
            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
            label: 'Latin America',
            borderColor: '#e8c3b9',
            fill: false
          }, {
            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
            label: 'North America',
            borderColor: '#c45850',
            fill: false
          }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'World population per region (in millions)'
          }
        }
      });
    }

    /* bar-chart */
    var _chartjspie = $('#pie-chart');
    if (_chartjspie.exists()) {
      new Chart(_chartjspie, {
        type: 'pie',
        data: {
          labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
          datasets: [{
            label: 'Population (millions)',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
            data: [2478, 5267, 734, 784, 433]
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });
    }

    /* bar-chart */
    var _chartjsradar = $('#radar-chart');
    if (_chartjsradar.exists()) {
      new Chart(_chartjsradar, {
        type: 'radar',
        data: {
          labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
          datasets: [
            {
              label: '1950',
              fill: true,
              backgroundColor: 'rgba( 179, 181, 198, 0.2 )',
              borderColor: 'rgba( 179, 181, 198, 1 )',
              pointBorderColor: '#fff',
              pointBackgroundColor: 'rgba( 179, 181, 198, 1 )',
              data: [8.77, 55.61, 21.69, 6.62, 6.82]
            }, {
              label: '2050',
              fill: true,
              backgroundColor: 'rgba( 255, 99, 132, 0.2 )',
              borderColor: 'rgba( 255, 99, 132, 1 )',
              pointBorderColor: '#fff',
              pointBackgroundColor: 'rgba( 255, 99, 132, 1 )',
              pointBorderColor: '#fff',
              data: [25.48, 54.16, 7.61, 8.06, 4.45]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Distribution in % of world population'
          }
        }
      });
    }

    /* polar-chart */
    var _chartjspolar = $('#polar-chart');
    if (_chartjspolar.exists()) {
      new Chart(_chartjspolar, {
        type: 'polarArea',
        data: {
          labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
          datasets: [
            {
              label: 'Population (millions)',
              backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
              data: [2478, 5267, 734, 784, 433]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });
    }

    /* doughnut-chart */
    var _chartjsdoughnut = $('#doughnut-chart');
    if (_chartjsdoughnut.exists()) {
      new Chart(_chartjsdoughnut, {
        type: 'doughnut',
        data: {
          labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
          datasets: [
            {
              label: 'Population (millions)',
              backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
              data: [2478, 5267, 734, 784, 433]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });
    }

    /* horizontal */
    var _chartjshorizontal = $('#horizontal-chart');
    if (_chartjshorizontal.exists()) {
      new Chart(_chartjshorizontal, {
        type: 'horizontalBar',
        data: {
          labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
          datasets: [
            {
              label: 'Population (millions)',
              backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'],
              data: [2478, 5267, 734, 784, 433]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });
    }

    /* grouped */
    var _chartjsgrouped = $('#grouped-chart');
    if (_chartjsgrouped.exists()) {
      new Chart(_chartjsgrouped, {
        type: 'bar',
        data: {
          labels: ['1900', '1950', '1999', '2050'],
          datasets: [
            {
              label: 'Africa',
              backgroundColor: '#3e95cd',
              data: [133, 221, 783, 2478]
            }, {
              label: 'Europe',
              backgroundColor: '#8e5ea2',
              data: [408, 547, 675, 734]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
      });
    }

    /* grouped */
    var _chartjsmixed = $('#mixed-chart');
    if (_chartjsmixed.exists()) {
      new Chart(_chartjsmixed, {
        type: 'bar',
        data: {
          labels: ['1900', '1950', '1999', '2050'],
          datasets: [{
            label: 'Europe',
            type: 'line',
            borderColor: '#8e5ea2',
            data: [408, 547, 675, 734],
            fill: false
          }, {
            label: 'Africa',
            type: 'line',
            borderColor: '#3e95cd',
            data: [133, 221, 783, 2478],
            fill: false
          }, {
            label: 'Europe',
            type: 'bar',
            backgroundColor: 'rgba( 0, 0, 0, 0.2 )',
            data: [408, 547, 675, 734],
          }, {
            label: 'Africa',
            type: 'bar',
            backgroundColor: 'rgba( 0, 0, 0, 0.2 )',
            backgroundColorHover: '#3e95cd',
            data: [133, 221, 783, 2478]
          }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions): Europe & Africa'
          },
          legend: { display: false }
        }
      });
    }

    /* grouped */
    var _chartjsbubble = $('#bubble-chart');
    if (_chartjsbubble.length) {
      new Chart(_chartjsbubble, {
        type: 'bubble',
        data: {
          labels: 'Africa',
          datasets: [
            {
              label: ['China'],
              backgroundColor: 'rgba( 255, 221, 50, 0.2 )',
              borderColor: 'rgba( 255, 221, 50, 1 )',
              data: [{
                x: 21269017,
                y: 5.245,
                r: 15
              }]
            }, {
              label: ['Denmark'],
              backgroundColor: 'rgba( 60, 186, 159, 0.2 )',
              borderColor: 'rgba( 60, 186, 159, 1 )',
              data: [{
                x: 258702,
                y: 7.526,
                r: 10
              }]
            }, {
              label: ['Germany'],
              backgroundColor: 'rgba( 0, 0, 0, 0.2 )',
              borderColor: '#000',
              data: [{
                x: 3979083,
                y: 6.994,
                r: 15
              }]
            }, {
              label: ['Japan'],
              backgroundColor: 'rgba( 193, 46, 12, 0.2 )',
              borderColor: 'rgba( 193, 46, 12, 1 )',
              data: [{
                x: 4931877,
                y: 5.921,
                r: 15
              }]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }, scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Happiness'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'GDP (PPP)'
              }
            }]
          }
        }
      });
    }
    
    /* ------------------------------------------------------------------------
     * flatpicker
     * ------------------------------------------------------------------------ */
    flatpickr(".date-picker" ,{
      position:'below',
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "m-d-y",
      allowInput: true,
      onChange: function(selectedDates, dateStr, instance){
      // remove validation error message
      $(".date-picker").removeClass('is-invalid').next().text(""); 
    },
    });
    /* ------------------------------------------------------------------------
     * Duallistbox
     * ------------------------------------------------------------------------ */

    var _demo1 = $('select[name="duallistbox_demo1[]"]');
    if (_demo1.exists()) {
      _demo1.bootstrapDualListbox();
    }

    $("#demoform").submit(function () {
      alert($('[name="duallistbox_demo1[]"]').val());
      return false;
    });

    var _demo2 = $('.demo2');
    if (_demo2.exists()) {
      _demo2.bootstrapDualListbox({
        nonSelectedListLabel: 'Non-selected',
        selectedListLabel: 'Selected',
        preserveSelectionOnMove: 'moved',
        moveOnSelect: false,
        nonSelectedFilter: 'ion ([7-9]|[1][0-2])'
      });
    }
    window.prettyPrint && prettyPrint()
    /* ------------------------------------------------------------------------
     * Morris
     * ------------------------------------------------------------------------ */
    // morris-area
    var morris = $("#morris-area");
    if (morris.exists()) {
      // Use Morris.Area instead of Morris.Line
      Morris.Area({
        element: 'morris-area',
        data: [
          { x: '2010 Q4', y: 3, z: 7 },
          { x: '2011 Q1', y: 3, z: 4 },
          { x: '2011 Q2', y: null, z: 1 },
          { x: '2011 Q3', y: 2, z: 5 },
          { x: '2011 Q4', y: 8, z: 2 },
          { x: '2012 Q1', y: 4, z: 4 }
        ],
        xkey: 'x',
        ykeys: ['y', 'z'],
        labels: ['Y', 'Z']
      }).on('click', function (i, row) {
        console.log(i, row);
      });
    }

    // morris-bar
    var morris = $("#morris-bar");
    if (morris.exists()) {
      Morris.Bar({
        element: 'morris-bar',
        data: [
          { x: '2011 Q1', y: 3, z: 2, a: 3 },
          { x: '2011 Q2', y: 2, z: 5, a: 1 },
          { x: '2011 Q3', y: 6, z: 2, a: 4 },
          { x: '2011 Q4', y: 2, z: 4, a: 3 }
        ],
        xkey: 'x',
        ykeys: ['y', 'z', 'a'],
        labels: ['Y', 'Z', 'A']
      }).on('click', function (i, row) {
        console.log(i, row);
      });
    }

    // morris-bar
    var morris = $("#morris-donut");
    if (morris.exists()) {
      Morris.Donut({
        element: 'morris-donut',
        data: [
          { value: 70, label: 'foo' },
          { value: 15, label: 'bar' },
          { value: 10, label: 'baz' },
          { value: 5, label: 'A really really long label' }
        ],
        formatter: function (x) { return x + "%" }
      }).on('click', function (i, row) {
        console.log(i, row);
      });
    }

    // morris-bar
    var morris = $("#morris-line-non-continuous");
    if (morris.exists()) {
      var day_data = [
        { "period": "2012-10-01", "licensed": 3407 },
        { "period": "2012-09-30", "sorned": 0 },
        { "period": "2012-09-29", "sorned": 618 },
        { "period": "2012-09-20", "licensed": 3246, "sorned": 661 },
        { "period": "2012-09-19", "licensed": 3257, "sorned": null },
        { "period": "2012-09-18", "licensed": 3248, "other": 1000 },
        { "period": "2012-09-17", "sorned": 0 },
        { "period": "2012-09-16", "sorned": 0 },
        { "period": "2012-09-15", "licensed": 3201, "sorned": 656 },
        { "period": "2012-09-10", "licensed": 3215 }
      ];
      Morris.Line({
        element: 'morris-line-non-continuous',
        data: day_data,
        xkey: 'period',
        ykeys: ['licensed', 'sorned', 'other'],
        labels: ['Licensed', 'SORN', 'Other'],
        // custom label formatting with `xLabelFormat` 
        xLabelFormat: function (d) { return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(); },
        // setting `xLabels` is recommended when using xLabelFormat
        xLabels: 'day'
      });
    }

    // morris-bar
    var morris = $("#morris-line");
    if (morris.exists()) {
      var day_data = [
        { "elapsed": "I", "value": 34 },
        { "elapsed": "II", "value": 24 },
        { "elapsed": "III", "value": 3 },
        { "elapsed": "IV", "value": 12 },
        { "elapsed": "V", "value": 13 },
        { "elapsed": "VI", "value": 22 },
        { "elapsed": "VII", "value": 5 },
        { "elapsed": "VIII", "value": 26 },
        { "elapsed": "IX", "value": 12 },
        { "elapsed": "X", "value": 19 }
      ];
      Morris.Line({
        element: 'morris-line',
        data: day_data,
        xkey: 'elapsed',
        ykeys: ['value'],
        labels: ['value'],
        parseTime: false
      });
    }

    // morris-bar
    var morris = $("#morris-stacked-bars");
    if (morris.exists()) {
      Morris.Bar({
        element: 'morris-stacked-bars',
        data: [
          { x: '2011 Q1', y: 3, z: 2, a: 3 },
          { x: '2011 Q2', y: 2, z: null, a: 1 },
          { x: '2011 Q3', y: 0, z: 2, a: 4 },
          { x: '2011 Q4', y: 2, z: 4, a: 3 }
        ],
        xkey: 'x',
        ykeys: ['y', 'z', 'a'],
        labels: ['Y', 'Z', 'A'],
        stacked: true
      });
    }

    /* ------------------------------------------------------------------------
     * Nestable
     * ------------------------------------------------------------------------ */

    var _nestable = $("#nestable");
    if (_nestable.exists()) {
      _nestable.nestable();
    }

    var _nestable2 = $("#nestable2");
    if (_nestable2.exists()) {
      _nestable2.nestable();
    }

    /* ------------------------------------------------------------------------
     * Peity
     * ------------------------------------------------------------------------ */
    var _pie_chart = $(".pie");
    if (_pie_chart.exists()) {
      _pie_chart.peity("pie");
    }
    var _donut_chart = $('.donut');
    if (_donut_chart.exists()) {
      _donut_chart.peity('donut');
    }
    var _line_chart = $(".line");
    if (_line_chart.exists()) {
      _line_chart.peity("line");
    }
    var _bar_chart = $(".bar");
    if (_bar_chart.exists()) {
      _bar_chart.peity("bar");
    }

    var _donut_span_chart = $(".data-attributes span");
    if (_donut_span_chart.exists()) {
      _donut_span_chart.peity("donut");
    }

    var _bar_colours_1 = $(".bar-colours-1");
    if (_bar_colours_1.exists()) {
      _bar_colours_1.peity("bar", {
        fill: ["#838df4", "#50d294", "#53cad8"]
      })
    }

    var _bar_colours_2 = $(".bar-colours-2");
    if (_bar_colours_2.exists()) {
      _bar_colours_2.peity("bar", {
        fill: function (value) {
          return value > 0 ? "#50d294" : "#838df4"
        }
      })
    }

    var _bar_colours_3 = $(".bar-colours-3");
    if (_bar_colours_3.exists()) {
      _bar_colours_3.peity("bar", {
        fill: function (_, i, all) {
          var g = parseInt((i / all.length) * 255)
          return "rgb(255, " + g + ", 0)"
        }
      })
    }

    var _pie_colours_1 = $(".pie-colours-1");
    if (_pie_colours_1.exists()) {
      _pie_colours_1.peity("pie", {
        fill: ["#838df4", "#f36c9b", "#ffea04", "#4b4d56"]
      })
    }

    var _pie_colours_2 = $(".pie-colours-2");
    if (_pie_colours_2.exists()) {
      _pie_colours_2.peity("pie", {
        fill: function (_, i, all) {
          var g = parseInt((i / all.length) * 255)
          return "rgb(255, " + g + ", 0)"
        }
      })
    }

    /* ------------------------------------------------------------------------
     * Rangeslider
     * ------------------------------------------------------------------------ */
    var _rangeslider_basic = $('#rangeslider-basic');
    if (_rangeslider_basic.exists()) {
      _rangeslider_basic.ionRangeSlider({
        min: 100,
        max: 1000,
        from: 550
      });
    }

    var _rangeslider_double = $('#rangeslider-double');
    if (_rangeslider_double.exists()) {
      _rangeslider_double.ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 1000,
        from: 200,
        to: 800,
        prefix: "$"
      });
    }

    var _rangeslider_range_step = $('#rangeslider-range-step');
    if (_rangeslider_range_step.exists()) {
      _rangeslider_range_step.ionRangeSlider({
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -500,
        to: 500
      });
    }

    var _rangeslider_custom_values = $('#rangeslider-custom-values');
    if (_rangeslider_custom_values.exists()) {
      var custom_values = [0, 10, 100, 1000, 10000, 100000, 1000000];

      // be careful! FROM and TO should be index of values array
      var my_from = custom_values.indexOf(10);
      var my_to = custom_values.indexOf(10000);

      _rangeslider_custom_values.ionRangeSlider({
        type: "double",
        grid: true,
        from: my_from,
        to: my_to,
        values: custom_values
      });
    }

    var _rangeslider_strings = $('#rangeslider-strings');
    if (_rangeslider_strings.exists()) {
      _rangeslider_strings.ionRangeSlider({
        grid: true,
        from: new Date().getMonth(),
        values: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ]
      });
    }

    var _rangeslider_prettify = $('#rangeslider-prettify');
    if (_rangeslider_prettify.exists()) {
      function my_prettify(n) {
        var num = Math.log2(n);
        return n + " → " + (+num.toFixed(3));
      }

      _rangeslider_prettify.ionRangeSlider({
        skin: "big",
        grid: true,
        min: 1,
        max: 1000,
        from: 100,
        prettify: my_prettify
      });
    }

    
    /* ------------------------------------------------------------------------
     * Summernote
     * ------------------------------------------------------------------------ */
    var _summernote = $('.summernote');
    if (_summernote.exists()) {
      _summernote.summernote({
        height: 250
      });
    }

    /* ------------------------------------------------------------------------
     * TouchSpin
     * ------------------------------------------------------------------------ */
    var _touch_spin = $("input[name='demo1']");
    if (_touch_spin.exists()) {
      _touch_spin.TouchSpin({
        min: 0,
        max: 100,
        step: 0.1,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        postfix: '%'
      });
    }

    var _touch_spin2 = $("input[name='demo2']");
    if (_touch_spin2.exists()) {
      _touch_spin2.TouchSpin({
        min: -1000000000,
        max: 1000000000,
        stepinterval: 50,
        maxboostedstep: 10000000,
        prefix: '$'
      });
    }

    var _touch_demo_vertical = $("input[name='demo_vertical']");
    if (_touch_demo_vertical.exists()) {
      _touch_demo_vertical.TouchSpin({
        verticalbuttons: true
      });
    }

    var _touch_demo_vertical2 = $("input[name='demo_vertical2']");
    if (_touch_demo_vertical2.exists()) {
      _touch_demo_vertical2.TouchSpin({
        verticalbuttons: true,
        verticalupclass: 'glyphicon glyphicon-plus',
        verticaldownclass: 'glyphicon glyphicon-minus'
      });
    }

    var _touch_spin3 = $("input[name='demo3']");
    if (_touch_spin3.exists()) {
      _touch_spin3.TouchSpin();
    }

    var _touch_spin3_21 = $("input[name='demo3_21']");
    if (_touch_spin3_21.exists()) {
      _touch_spin3_21.TouchSpin({
        initval: 40
      });
    }

    var _touch_spin3_22 = $("input[name='demo3_22']");
    if (_touch_spin3_22.exists()) {
      _touch_spin3_22.TouchSpin({
        initval: 40
      });
    }

    var _touch_spin4 = $("input[name='demo4']");
    if (_touch_spin4.exists()) {
      _touch_spin4.TouchSpin({
        postfix: "a button",
      });
    }

    var _touch_spin4_2 = $("input[name='demo4_2']");
    if (_touch_spin4_2.exists()) {
      _touch_spin4_2.TouchSpin({
        postfix: "a button",
      });
    }


    var _touch_spin6 = $("input[name='demo6']");
    if (_touch_spin6.exists()) {
      _touch_spin6.TouchSpin({
        buttondown_class: "btn btn-link",
        buttonup_class: "btn btn-link"
      });
    }

    /* ------------------------------------------------------------------------
     * Google Map
     * ------------------------------------------------------------------------ */
    var _map_basic = $('#map-basic');
    if (_map_basic.exists()) {
      new GMaps({
        div: '#map-basic',
        lat: 51.507194,
        lng: -0.129072
      });
    }

    var _maps_markers = $('#maps-markers');
    if (_maps_markers.exists()) {
      var loc_map;
      loc_map = new GMaps({
        el: '#maps-markers',
        lat: 51.507194,
        lng: -0.129072,
        scrollwheel: false
      });
      loc_map.addMarker({
        lat: 51.507194,
        lng: -0.129072,
        title: 'Info wondow for Location Marker',
        infoWindow: {
          content: '<p> Infinity Softway </p>'
        }
      });
    }

    var _maps_street_view = $('#maps-street-view');
    if (_maps_street_view.exists()) {
      GMaps.createPanorama({
        el: '#maps-street-view',
        lat: 51.507194,
        lng: -0.129072,
      });
    }

    var _maps_type = $('#maps-type');
    if (_maps_type.exists()) {
      var type_map;

      type_map = new GMaps({
        div: '#maps-type',
        lat: 51.507194,
        lng: -0.129072,
        mapTypeControlOptions: {
          mapTypeIds: ["hybrid", "roadmap", "satellite", "terrain", "osm"]
        }
      });
      type_map.addMapType("osm", {
        getTileUrl: function (coord, zoom) {
          return "https://a.tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
      });
      type_map.setMapTypeId("osm");
    }

    var _maps_overlays = $('#maps-overlays');
    if (_maps_overlays.exists()) {
      var overlays_map;
      overlays_map = new GMaps({
        div: '#maps-overlays',
        lat: 51.507194,
        lng: -0.129072,
      });
      overlays_map.drawOverlay({
        lat: overlays_map.getCenter().lat(),
        lng: overlays_map.getCenter().lng(),
        content: '<div class="maps-overlay">London </div>',
        verticalAlign: 'top',
        horizontalAlign: 'center'
      });
    }


    var _maps_georss = $('#maps-georss');
    if (_maps_georss.exists()) {
      var georss_map, infoWindow;
      infoWindow = new google.maps.InfoWindow({});
      georss_map = new GMaps({
        div: '#maps-georss',
        zoom: 12,
        lat: 51.507194,
        lng: -0.129072,
      });
      georss_map.loadFromKML({
        url: 'http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss',
        suppressInfoWindows: true,
        events: {
          click: function (point) {
            infoWindow.setContent(point.featureData.infoWindowHtml);
            infoWindow.setPosition(point.latLng);
            infoWindow.open(georss_map.georss_map);
          }
        }
      });
    }

    /* ------------------------------------------------------------------------
     * Calendar
     * ------------------------------------------------------------------------ */
    var _calendar = $('#calendar');
    if (_calendar.exists()) {
      _calendar.fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2021-01-01',
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function () {
          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
          }
        },
        eventLimit: true, // allow "more" link when too many events
        events: [
          {
            title: 'All Day Event',
            start: '2021-03-01',
            className: 'event-primary'
          },
          {
            title: 'Long Event',
            start: '2021-03-07',
            end: '2021-03-10',
            className: 'event-secondary'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2021-03-09T16:00:00',
            className: 'event-success'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2021-03-16T16:00:00',
            className: 'event-danger'
          },
          {
            title: 'Conference',
            start: '2021-03-11',
            end: '2021-03-13',
            className: 'event-warning'
          },
          {
            title: 'Meeting',
            start: '2021-03-12T10:30:00',
            end: '2021-03-12T12:30:00',
            className: 'event-info'
          },
          {
            title: 'Lunch',
            start: '2021-03-12T12:00:00',

          },
          {
            title: 'Meeting',
            start: '2021-03-12T14:30:00',
            className: 'event-light'
          },
          {
            title: 'Happy Hour',
            start: '2021-03-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2021-03-12T20:00:00',
            className: 'event-primary'
          },
          {
            title: 'Birthday Party',
            start: '2021-03-13T07:00:00',
            className: 'event-info'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2021-03-28',
            className: 'event-light'
          }
        ]
      });
    }

    var _external_events = $('#external-events .fc-event');
    if (_external_events.exists()) {
      _external_events.each(function () {
        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
          title: $.trim($(this).text()), // use the element's text as the event title
          stick: true, // maintain when user navigates (see docs on the renderEvent method)
          color: $(this).data('color')
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex: 999,
          revert: true,      // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
        });
      });
    }

    // page is now ready, initialize the calendar...
    var _calendar = $('#calendar');
    if (_calendar.exists()) {
      _calendar.fullCalendar({
        // put your options and callbacks here
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        droppable: true // this allows things to be dropped onto the calendar
      });
    }

    var _calendar_list = $('#calendar-list');
    if (_calendar_list.exists()) {
      _calendar_list.fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'listDay,listWeek,month'
        },

        // customize the button names,
        // otherwise they'd all just say "list"
        views: {
          listDay: { buttonText: 'list day' },
          listWeek: { buttonText: 'list week' }
        },

        defaultView: 'listWeek',
        defaultDate: '2021-03-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
          {
            title: 'All Day Event',
            start: '2021-03-01'
          },
          {
            title: 'Long Event',
            start: '2021-03-07',
            end: '2021-03-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2021-03-09T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2021-03-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2021-03-11',
            end: '2021-03-13'
          },
          {
            title: 'Meeting',
            start: '2021-03-12T10:30:00',
            end: '2021-03-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2021-03-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2021-03-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2021-03-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2021-03-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2021-03-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2021-03-28'
          }
        ]
      });
    }

    var _start_tour = $('#start-tour');
    if (_start_tour.exists()) {
      // Instance the tour
      var tour = new Tour({
        debug: false,
        backdrop: true,
        steps: [
          {
            element: "#tour-01",
            title: "Title of my step",
            content: "Content of my step"
          },
          {
            element: "#tour-02",
            title: "Title of my step",
            content: "Content of my step"
          }
          ,
          {
            element: "#tour-03",
            title: "Title of my step",
            content: "Content of my step"
          }
        ]
      });

      // Initialize the tour
      tour.init();
      // start tour
      _start_tour.click(function () {
        tour.restart();
      });
    }
   // Nprogress
   NProgress.configure({ showSpinner: false });

 
});
})(jQuery); // End of use strict