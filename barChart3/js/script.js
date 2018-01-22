  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart () {

    $.ajax({
        url: "js/MOCK_DATA.json",
        dataType: "json",
        success: function(statData){
          console.log(statData[0]["Murders per year"]);

          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Country');
          data.addColumn('number', 'Deaths');
          data.addColumn('number', 'Marriages');
          data.addColumn('number', 'Murders');
          for (var i = 0; i < statData.length; i++) {
           data.addRow([statData[i]["Country"], statData[i]["Deaths per year"], statData[i]["Marriages per year"], statData[i]["Murders per year"] ])
          }
          
    

          var options = {
            title: 'Deaths, marriages and murders per country',
            hAxis: {
              title: 'Deaths'
            },
            vAxis: {
              title: 'Marriages'
            },
            animation: {
              startup: true,
              duration: 1000,
              easing: 'out'
            }
          };

          var chart = new google.visualization.BubbleChart(document.getElementById('chartLocation'));
          chart.draw(data, options);
          },
        error: function() {
          alert('something went wrong, cant connect to server');
          }

    });

  }