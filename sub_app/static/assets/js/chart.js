$(document).ready(function() {
    $.ajax({
        url:"http://localhost/hhc/graph.php",
        method: "GET",
        success:function (data) {
            console.log(data);
            var idd = [];
            var unittprice = [];

            for(var i in data)
            {
                idd.push("id" + data[i].id);
                unittprice.push(data[i].unitprice);
            }



// Bar Chart

            var barChartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                datasets: [{
                    label: 'Dataset a',
                    backgroundColor: 'rgba(0, 158, 251, 0.5)',
                    borderColor: 'rgba(0, 158, 251, 1)',
                    borderWidth: 1,
                    data: unittprice
                }, {
                    label: 'Dataset b',
                    backgroundColor: 'rgba(255, 188, 53, 0.5)',
                    borderColor: 'rgba(255, 188, 53, 1)',
                    borderWidth: 1,
                    data: unittprice
                }]
            };

            var ctx = document.getElementById('bargraph').getContext('2d');
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    }
                }
            });



// Line Chart

            var lineChartData = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Alot of wishes",
                    backgroundColor: "rgba(0, 158, 251, 0.5)",
                    data: [100, 70, 20, 100, 120, 50, 70, 50, 50, 100, 50, 90]
                }, {
                    label: "William haule",
                    backgroundColor: "rgba(255, 188, 53, 0.5)",
                    fill: true,
                    data: [28, 48, 40, 19, 86, 27, 20, 90, 50, 20, 90, 20]
                }]
            };

            var linectx = document.getElementById('linegraph').getContext('2d');
            window.myLine = new Chart(linectx, {
                type: 'line',
                data: lineChartData,
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                    }
                }
            });

// Bar Chart 2

            barChart();

            $(window).resize(function(){
                barChart();
            });

            function barChart(){
                $('.bar-chart').find('.item-progress').each(function(){
                    var itemProgress = $(this),
                        itemProgressWidth = $(this).parent().width() * ($(this).data('percent') / 100);
                    itemProgress.css('width', itemProgressWidth);
                });
            };

        },
        error:function (data) {
            console.log(data);
        },
    });



});


