  var statData = [
    {
        Year: '2013',
        Births: 58719,
        Deaths: 29568,
        Marriages: 19237 

    },
    {
        Year: '2014',
        Births: 57243,
        Deaths: 31062,
        Marriages: 20125 

    },
    {
        Year: '2015',
        Births: 61038,
        Deaths: 31608,
        Marriages: 19947 

    },
    {
        Year: '2016',
        Births: 59430,
        Deaths: 31179,
        Marriages: 20235

    }
  ];  



  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart () {

    $.ajax({
        url: "js/data.json",
        dataType: "json",
        success: function(statData){
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Year');
          data.addColumn('number', 'Births');
          data.addColumn('number', 'Deaths');
          data.addColumn('number', 'Marriages');
          for (var i = 0; i < statData.length; i++) {
          data.addRow([statData[i].Year, statData[i].Births, statData[i].Deaths, statData[i].Marriages])
          }
    

          var options = {
            title: 'Births, deaths and Marriages from NZ',
            subtitle: 'over the last 4 years',
            hAxis: {
              title: 'Number',
              minValue: 0
            },
            vAxis: {
              title: 'Year'
            },
            animation: {
              startup: true,
              duration: 1000,
              easing: 'out'
            }
          };

          var chart = new google.visualization.BarChart(document.getElementById('chartLocation'));
          chart.draw(data, options);
          },
        error: function() {
          alert('something went wrong, cant connect to server');
          }

    });

   //  var data = new google.visualization.DataTable();
   //  data.addColumn('string', 'Year');
   //  data.addColumn('number', 'Births');
   //  data.addColumn('number', 'Deaths');
   //  data.addColumn('number', 'Marriages');

   //  for (var i = 0; i < statData.length; i++) {
   //    data.addRow([statData[i].Year, statData[i].Births, statData[i].Deaths, statData[i].Marriages])
   //  }
    

  	// var options = {

  	// 	title: 'Births, deaths and Marriages from NZ',
  	// 	subtitle: 'over the last 4 years',
  	// 	hAxis: {
  	// 		title: 'Number',
  	// 		minValue: 0
  	// 	},
  	// 	vAxis: {
  	// 		title: 'Year'
  	// 	},
  	// 	animation: {
  	// 		startup: true,
  	// 		duration: 1000,
  	// 		easing: 'out'
  	// 	}
  	// };

  	// var chart = new google.visualization.BarChart(document.getElementById('chartLocation'));
  	// chart.draw(data, options);


  }