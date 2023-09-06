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
                    
                    alert("OTCSTicket is Generated");
                        
                    myTicket = res.ticket;
                       
                },
                error: function (res) {
                    
                    alert("Something Error happened! " + res.statusText);
                }
            });

        }



function CreateFolder() {
alert(myTicket);



  
            var parentID = document.getElementById("parentID").value;
            var folderName = document.getElementById("folderName").value;

            // Create the request body
            var myBody = {
                type: '0',
                parent_id: parentID,
                name: folderName
            };
$(document).ready(function(){

var url = baseURL+'/api/v1/nodes';
$.support.cors = true;
$.ajax({
url:url,
type:"POST",
crossDomain: true,
data:myBody,
dataType:"json",
headers: { "OTCSTICKET": myTicket },
success:function(res){
alert("success!");
alert("Folder object id = " + res.id);
},
error:function(res){
alert("Bad thing happened! " + res.statusText);
}
});
});
}


function updateFolderNameDescription() {
    // Get values from input fields
    var nodeId = document.getElementById('nodeIdF').value;
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;

    // Create the request body
    var myBody = {
        name: name,
        description: description,
    };

    // Assuming you have 'baseURL' and 'myTicket' defined somewhere in your code
    var url = baseURL + '/api/v1/nodes/' + nodeId;

    $.support.cors = true;
    $.ajax({
        url: url,
        type: "PUT",
        crossDomain: true,
        data: myBody, // Convert the object to JSON
        dataType: "json",
        headers: { "OTCSTICKET": myTicket },
        success: function (res) {
            alert("Success!");
        },
        error: function (res) {
            alert("Bad thing happened! " + res.statusText);
        }
    });
}





// function fetchCategories() {
//             var nodeId = document.getElementById('nodeIdC').value;

           
//             var url = baseURL + '/api/v1/nodes/' + nodeId + '/categories';
//             myBody={};
//             $.ajax({
//                 url: url,
//                 type: "GET",
//                 crossDomain: true,
//                 data: myBody,
//                 dataType: "json",
//                 headers: { "OTCSTICKET": myTicket },

//                success: function (res) {
//     var data = res.data;

//     if (data && data.length > 0) {
//         var categoryList = document.getElementById('categoryList');
//         categoryList.innerHTML = ''; // Clear any existing data

//         // Iterate through the data and display "id"
//         for (var i = 0; i < data.length; i++) {
//             var category = data[i];
//             var categoryItem = document.createElement('div');
//             categoryItem.textContent = 'ID: ' + category.id;
//             categoryList.appendChild(categoryItem);
//         }
//     } else {
//         alert("No data found.");
//     }
// },

//                 error: function (res) {
//                     alert("Bad thing happened! " + res.statusText);
//                 }

               
//             });
//         }



function fetchCategories() {
    var nodeId = document.getElementById('nodeIdC').value;
    var baseURL = 'https://example.com'; // Replace with your actual base URL
    var myTicket = 'your-ticket-value'; // Replace with your actual OTCSTICKET value

    var url = baseURL + '/api/v1/nodes/' + nodeId + '/categories';
    myBody = {};
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
                    
                    // Add an event listener to handle category click
                    categoryItem.addEventListener('click', function() {
                        getCategoryInfo(nodeId, category.id);
                    });
                    
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

function getCategoryInfo(nodeId, categoryId) {
  

    var url = baseURL + '/api/v1/nodes/' + nodeId + '/categories/' + categoryId;

    $.ajax({
        url: url,
        type: "GET",
        crossDomain: true,
        data: {},
        dataType: "json",
        headers: { "OTCSTICKET": myTicket },

       success: function (res) {
    var categoryInfoElement = document.getElementById('categoryInfo');
    
    if (categoryInfoElement) {
        categoryInfoElement.innerHTML = ''; // Clear any existing data
    
        // Display all details of the category
        for (var key in res) {
            if (res.hasOwnProperty(key)) {
                var detailItem = document.createElement('div');
                detailItem.textContent = key + ': ' + res[key];
                categoryInfoElement.appendChild(detailItem);
            }
        }
    } else {
        console.log("Category Info Element not found.");
    }
},


        error: function (res) {
            alert("Bad thing happened! " + res.statusText);
        }
    });
}

