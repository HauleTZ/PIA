
    $(document).ready(function () {
        $('.dropdown-toggle').click(function () {
            $.post("filtration.php",
                {notification : $('#notification').val()},
                function (data) {
                    $('#Notify').html(data);

                }

            );

            $.post("list.php",
                {notification : $('#notification').val()},
                function (data) {
                    $('.noti-details').html(data);

                }

            );
        })
    })







    setInterval(
        function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("Notify").innerHTML = this.responseText;
                }
            };
            xhttp.open("GET", "not.php", true);
            xhttp.send();
        }, 1000);



    setInterval(
        function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("haule").innerHTML = this.responseText;
                }
            };
            xhttp.open("GET", "activitylist.php", true);
            xhttp.send();
        }, 1000);

