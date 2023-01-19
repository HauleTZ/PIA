$(document).ready(function(){
    $('#updatePassword').click(function(){
        var p = $('#p').val();
        var cp = $('#cp').val();
        if(cp != p)
        {
            alert("Passwords Must match");
            return false;
        }

    });
});