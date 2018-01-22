  google.charts.load('current', {packages: ['corechart', 'controls']});
  google.charts.setOnLoadCallback(drawDashboard);

  function drawDashboard() {

    $.ajax({
        url: "js/people_info.json",
        dataType: "json",
        success: function(dataFromJSON) {
          console.log(dataFromJSON);

          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Name');
          data.addColumn('number', 'Age');
          data.addColumn('number', 'Income');
          data.addColumn('string', 'Gender');

          for (var i = 0; i < dataFromJSON.length; i++) {
              data.addRow ([dataFromJSON[i].first_name,
              dataFromJSON[i].age,
              dataFromJSON[i].annual_income,
              dataFromJSON[i].gender
            ]);
          }

          var dashboard = new google.visualization.Dashboard (document.getElementById('dashboard'));

          var scatterChart = new google.visualization.ChartWrapper({
              chartType: 'ScatterChart',
              containerId: 'chart1',
              options: {
                width: '100%',
                height: '100%;',
                legend: 'none',
                title: 'Age vs Annual Income'
              },
              view: {
                columns: [1, 2]
              }
          });

          // var tableChart = new google.visualization.ChartWrapper({
          //     chartType: 'Table',
          //     containerId: 'chart2'
          // });


          var BarChart = new google.visualization.ChartWrapper({
              chartType: 'BarChart',
              containerId: 'chart3',
              options: {
                width: '100%',
                height: '100%;',
                legend: 'none',
                title: 'Age vs Annual Income'
              },
              view: {
                columns: [1, 2]
              }
          });


          // var PieChart = new google.visualization.ChartWrapper({
          //     chartType: 'PieChart',
          //     containerId: 'chart2',
          //     options: {
          //     title: 'Male vs Female tally',
          //     is3D: true
          //     },
          //     view: {
          //       columns: [3,2]
          //     }
          // });

          var incomeRangeSlider = new google.visualization.ControlWrapper({
              controlType: 'NumberRangeFilter',
              containerId: 'control1',
              options: {
                filterColumnLabel: 'Income'
              }
          });

          var genderFilter = new google.visualization.ControlWrapper({
              controlType: 'CategoryFilter',
              containerId: 'control2',
              options: {
                filterColumnLabel: 'Gender',
                ui: {
                  allowMultiple: false,
                  allowTyping: false,
                  labelStacking: 'vertical'
                }
              }
          });

          dashboard.bind([incomeRangeSlider, genderFilter], [scatterChart, BarChart]);
          dashboard.draw(data);
          drawPie(dataFromJSON);

        },
        error: function(error) {
          console.log(error);
          alert("something went wrong, cannot connect to the server")
        }
    });

  }


  function drawPie(data) {
      var dataGender = new google.visualization.DataTable();
      dataGender.addColumn('string', 'Gender');
      dataGender.addColumn('number', 'Count');

      var male = 0, female = 0;

      for (var i = 0; i < data.length; i++) {
          if(data[i].gender == "Male") {
            male++;
          } else if (data[i].gender == "Female") {
            female++;
          }
      }
      dataGender.addRow(["Male", male]);
      dataGender.addRow(["Female", female]);


      var options = {
        title: "Male and Female split",
        backgroundColor: {
          fill: "transparent"
        }
      };








      var Pie = new google.visualization.PieChart(document.getElementById('chart2'));
      Pie.draw(dataGender, options);
  }






































