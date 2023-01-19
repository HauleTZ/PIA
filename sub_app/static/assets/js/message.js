
setInterval(
    function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("sms").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "sms.php", true);
        xhttp.send();
    }, 1000);


$(document).ready(function () {
    $('.hasnotifications').click(function () {
        $.post("filtration.php",
            {message : $('#message').val()},
            function (data) {
                $('#sms').html(data);

            }

        );

        $.post("smslist.php",
            {message : $('#message').val()},
            function (data) {
                $('.list-box').html(data);

            }

        );
    })
})


setInterval(
    function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("william").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "messagesList.php", true);
        xhttp.send();
    }, 1000);


