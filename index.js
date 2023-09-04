        var myTicket;
        
        
        var baseURL;
        var userName;
        var password;
        
        var credentials;
        // var url = baseURL + '/api/v1/auth';
        // Function to authenticate the user
        function authenticateUser() {
        baseURL = document.getElementById("baseURL").value;
        userName = document.getElementById("userName").value;
        password = document.getElementById("password").value;
        credentials = { userName: userName, password: password };
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
                    document.getElementById("messageDiv").innerHTML = "OTCSTicket is Generated";
                    alert("OTCSTicket is Generated");
                     window.location.href = "https://santugt.github.io/apiToCall.github.io/HTML/buttons.html";
                    myTicket = res.ticket;
                },
                error: function (res) {
                    document.getElementById("messageDiv").innerHTML = "Something Error happened! " + res.statusText;
                    alert("Something Error happened! " + res.statusText);
                }
            });

                
            
          
        }


function updateFolderNameDescription() {
        
            var name = document.getElementById("name").value;
            var description = document.getElementById("description").value;
            var nodeId = document.getElementById("nodeIdF").value;
    
            var myBody = {
                description: description,
                name: name
            };
    
            var url = baseURL + '/api/v1/nodes/' + nodeId;
    
            $.ajax({
                url: url,
                type: "PUT",
                crossDomain: true,
                data: myBody,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                headers: { "OTCSTICKET": myTicket },
                success: function (res) {
                    alert("success!");
                    alert("Custom Folder object id = " + res);
                },
                error: function (res) {
                    alert("Bad thing happened! " + res.statusText);
                }
            });
        }





function fetchCategories() {
            var nodeId = document.getElementById('nodeIdC').value;

           
            var url = baseURL + '/api/v1/nodes/' + nodeId + '/categories';

            $.ajax({
                url: url,
                type: "GET",
                crossDomain: true,
                data: myBody,
                dataType: "json",
                headers: { "OTCSTICKET": myTicket },

               success: function (res) {
    var data = res.data;

    if (data && data.length > 0) {
        var categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = ''; // Clear any existing data

        // Iterate through the data and display "id"
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            var categoryItem = document.createElement('div');
            categoryItem.textContent = 'ID: ' + category.id;
            categoryList.appendChild(categoryItem);
        }
    } else {
        alert("No data found.");
    }
},

                error: function (res) {
                    alert("Bad thing happened! " + res.statusText);
                }

               
            });
        }
