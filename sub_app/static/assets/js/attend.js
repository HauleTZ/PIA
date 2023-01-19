
setInterval(
    function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("attendanceTable").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "userAttend.php", true);
        xhttp.send();
    }, 1000);

