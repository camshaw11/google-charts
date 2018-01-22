  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart () {

    $.ajax({
        url: "js/people_info.json",
        dataType: "json",
        success: function(dataFromServer) {
          // console.log(dataFromServer);

          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Age');
          data.addColumn('number', 'Income');

          for (var i = 0; i < dataFromServer.length; i++) {
            data.addRow([dataFromServer[i].age, dataFromServer[i].annual_income]);
          }

          var options = {
              title: "Age vs Annual income",
              hAxis: {
                title: "Age",
                ticks: [17, 40, 60, 80, 100]
              },
              vAxis: {
                title: "Annual Income",
                ticks: [25000, 50000, 75000, 100000]
              },
              legend: 'none'
          }

          var chart = new google.visualization.ScatterChart(document.getElementById('chartLocation'));
          google.visualization.events.addListener(chart, 'select', clickEvent);
          chart.draw(data, options);

          function clickEvent(e) {
              // alert('A dot was selected');
              var tableRow = chart.getSelection()[0].row;
              chart.setSelection();
              var personData = dataFromServer[tableRow];
              // console.log(dataFromServer[tableRow]);
              if (personData) {
                document.getElementById('name').innerText = personData.first_name + " " + personData.last_name;
                document.getElementById('avatar_image').src = personData.avatar;
                document.getElementById('avatar_image').alt = "image of" + personData.first_name;
                document.getElementById('email').innerText = personData.email;
                document.getElementById('company').innerText = personData.company;
                document.getElementById('jobTitle').innerText = personData.job_title;
                document.getElementById('age').innerText = personData.age;
                document.getElementById('gender').innerText = personData.gender;
              }
          }


        },
        error: function(error) {
          console.log(error);
          alert("something went wrong, cannot connect to the server")
        }
    });


  }
