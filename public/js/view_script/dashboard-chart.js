// Revenue chart
$(document).ready(function(){
  const month = [];
  const chartdata = [];
   $.ajax({
     method:"GET",
     url:'/admin/dashboard/getVisitorsPermonth',
     async: false,
     success: function (res) { 
       let data = res;
       data.forEach(element => {
          const monthdata = moment(new Date(element._id)).format("MMM");
          month.push(monthdata);
          chartdata.push(parseInt(element.count));
      });
     }
    });
    let options = {
        series: [{
        name: 'visitors',
        data: chartdata
      }],
        chart: {
        type: 'bar',
        height: 328,
        toolbar: {
          show : false
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      grid: {
        borderColor: '#e5e5e5',
      },
      colors: ["#335eea"],
      xaxis: {
        categories: month,
          labels: {
          style: {
              colors: "#898b96",
            },
          },
      },
      yaxis: {
        labels: {
          style: {
              colors: "#6c8df7",
            },
        },
      },
      fill: {
        opacity: 1
      },
      // title:{
      //   text:"Month visitors",
      //   align:"center",
      //   margin: 20,
      //   offsetY:20,
      //   style:{
      //     fontSize:"12px",
      //   }
      // },
      tooltip: {
        y: {
          formatter: function (val) {
            return  val
          }
        }
      }
      };
      var chart = new ApexCharts(document.querySelector("#monthly-visiitor"), options);
      chart.render();
});    