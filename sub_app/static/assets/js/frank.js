$(document).ready(function () {

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

            var chartdata = {
                labels : idd,
                datasets : [

                    {
                        label : 'male',
                        backgroundColor: 'rgba(0, 158, 251, 0.5)',
                        borderColor: 'rgba(0, 158, 251, 1)',
                        borderWidth: 1,
                        data : unittprice
                    },




                            {
                                label : 'female',
                                backgroundColor: 'rgba(255, 188, 53, 0.5)',
                                borderColor: 'rgba(255, 188, 53, 1)',
                                borderWidth: 1,
                                data : unittprice
                            }


                ]


            }

            var ctx = document.getElementById('can').getContext('2d');

            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: chartdata,
                options: {
                    responsive: true,
                    legend: {
                        display: false,
                    }
                }
            });


        },
        error:function (data) {
                  console.log(data);
        },
    });

});