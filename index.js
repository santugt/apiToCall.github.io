        var myTicket;
        var baseURL = 'http://localhost/otcs/cs.exe';
        
        // var baseURL = document.getElementById("baseURL").value;
        var userName = document.getElementById("userName").value;
        var password = document.getElementById("password").value;
        var credentials = { userName: userName, password: password };
        // var url = baseURL + '/api/v1/auth';
        // Function to authenticate the user
        function authenticateUser() {
            var url = baseURL + '/api/v1/auth';

            $.support.cors = true;
            $.ajax({
                url: url,
                type: "POST",
                crossDomain: true,
                data: credentials,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                success: function (res) {
                    document.getElementById("messageDiv").innerHTML = "OTCSTicket For Your Reference==> " +res.ticket;
                    alert("OTCSTicket is Generated");
                    myTicket = res.ticket;
                },
                error: function (res) {
                    document.getElementById("messageDiv").innerHTML = "Something Error happened! " + res.statusText;
                    alert("Something Error happened! " + res.statusText);
                }
            });
        }
