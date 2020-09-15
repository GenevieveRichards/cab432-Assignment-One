
fetch("/state/:code'")
    .then((res) => res.json())
    .then((data) => {
        let info = data;
        let graph1 = [];
        graph1.push(info.data_cov);
        const chart = {
            type: 'bar',
            series: [
                {
                    values: graph1
                }
            ]
        };

        // renders zingchart to the page
        zingchart.render({
            id: 'chart',
            data: chart,
            height: '100%',
            width: '100%'
        });
    });




// function renderChart(data, labels) {
//     var ctx = document.getElementById("myChart").getContext('2d');
//     var myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Number of Cases over time',
//                 data: data,
//             }]
//         },
//     });
// }
// window.onload = function () {
//     var chart = new CanvasJS.Chart("chartContainer", {
//         title: {
//             text: "Fruits sold in First Quarter"
//         },
//         data: [//array of dataSeries              
//             { //dataSeries object

//                 /*** Change type "column" to "bar", "area", "line" or "pie"***/
//                 type: "column",
//                 dataPoints: [
//                     { label: "banana", y: 18 },
//                     { label: "orange", y: 29 },
//                     { label: "apple", y: 40 },
//                     { label: "mango", y: 34 },
//                     { label: "grape", y: 24 }
//                 ]
//             }
//         ]
//     });

//     chart.render();
// }

// const fs = require('fs');
// const jsdom = require("jsdom");
// jsdom.defaultDocumentFeatures = {
//     FetchExternalResources: ["script"],
//     ProcessExternalResources: true
// };
// jsdom.env('<html><body><div id="chart-div" style="font-size:12; width:800px; height:800px;"><canvas id="myChart" width="400" height="400" style="width:400px;height:400px"></canvas>></div></body></html>',
//     ['https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.2.2/Chart.js'],
//     function (err, window) {
//         global.window = window;
//         global.document = window.document;
//         // Comes from the Chart.js link above just like <script src="...
//         global.Chart = window.Chart;
//         var canvas = document.getElementById('myChart');
//         var ctx = canvas.getContext('2d');
//         var myChart = new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//                 datasets: [{
//                     label: '# of Votes',
//                     data: [12, 19, 3, 5, 2, 3],
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(255, 206, 86, 0.2)',
//                         'rgba(75, 192, 192, 0.2)',
//                         'rgba(153, 102, 255, 0.2)',
//                         'rgba(255, 159, 64, 0.2)'
//                     ],
//                     borderColor: [
//                         'rgba(255,99,132,1)',
//                         'rgba(54, 162, 235, 1)',
//                         'rgba(255, 206, 86, 1)',
//                         'rgba(75, 192, 192, 1)',
//                         'rgba(153, 102, 255, 1)',
//                         'rgba(255, 159, 64, 1)'
//                     ],
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 responsive: false,
//                 animation: false,
//                 width: 400,
//                 height: 400,
//                 scales: {
//                     yAxes: [{
//                         ticks: {
//                             beginAtZero: true
//                         }
//                     }]
//                 }
//             }
//         })
//     });