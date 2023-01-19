
setInterval(
    function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("absent").innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "absent.php", true);
        xhttp.send();
    }, 7200 * 1000);

