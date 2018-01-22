  google.charts.load('current',{ 
  packages: ['geochart'],
  'mapsApiKey': 'AIzaSyAE4H9qGYQKVwN08kwlyBfaJpF_AHBq5HQ'
  });

  google.charts.setOnLoadCallback(drawChart);

  function drawChart () {

    $.ajax({
        url: "js/deathsInfo.json",
        dataType: "json",
        success: function(dataFromServer) {
          console.log(dataFromServer);

          var data = new google.visualization.DataTable();
          data.addColumn('string', 'country');
          data.addColumn('number', 'deaths');

          for (var i = 0; i < dataFromServer.length; i++) {
            data.addRow([dataFromServer[i].country, dataFromServer[i].deaths]);
          }

          var options = {
              colorAxis: {colors: ['#00E640','white', '#D91E18']},
              backgroundColor: '#59ABE3',
              datalessRegionColor: 'grey',
              defaultColor: 'white'
          }

          var chart = new google.visualization.GeoChart(document.getElementById('chartLocation'));
          google.visualization.events.addListener(chart, 'select', clickEvent);
          chart.draw(data, options);

          function clickEvent(e) {

              // var countryData = dataFromServer[0];
              var tableRow = chart.getSelection()[0].row;
              var deathData = dataFromServer[tableRow];

              console.log(deathData);

              if (deathData) {
                document.getElementById('title').innerText = deathData.deaths + " " + "Deaths in" + " " + deathData.country + " " + "this year";
              }
          }


        },
        error: function(error) {
          console.log(error);
          alert("something went wrong, cannot connect to the server")
        }
    });


  }
