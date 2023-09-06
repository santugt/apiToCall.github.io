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





function fetchCategories() {
            var nodeId = document.getElementById('nodeIdC').value;
            document.getElementById('nodeIdDisplay').textContent = 'Node ID: ' + nodeId;

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
                            categoryList.appendChild(categoryItem);

                            // Fetch and display category details
                            fetchCategoryDetails(nodeId, category.id);
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

   function fetchCategoryDetails(nodeId, categoryId) {
    var url = baseURL + '/api/v1/nodes/' + nodeId + '/categories/' + categoryId;
    myBody = {};
    $.ajax({
        url: url,
        type: "GET",
        crossDomain: true,
        data: myBody,
        dataType: "json",
        headers: { "OTCSTICKET": myTicket },

        success: function (res) {
            var categoryInfoElement = document.getElementById('categoryInfo');
            categoryInfoElement.innerHTML = ''; // Clear any existing data

            // Create a table element
            var table = document.createElement('table');

            // Add Node ID and Category ID as the first two rows in the table
            var nodeIdRow = table.insertRow();
            var nodeIdCell1 = nodeIdRow.insertCell(0);
            nodeIdCell1.textContent = 'Node ID:';
            var nodeIdCell2 = nodeIdRow.insertCell(1);
            nodeIdCell2.textContent = nodeId;

            var categoryIdRow = table.insertRow();
            var categoryIdCell1 = categoryIdRow.insertCell(0);
            categoryIdCell1.textContent = 'Category ID:';
            var categoryIdCell2 = categoryIdRow.insertCell(1);
            categoryIdCell2.textContent = categoryId;

            // Display attributes and their values within the 'data' object in the table
            var data = res.data;
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var attributeValue = data[key];
                    var row = table.insertRow();
                    var cell1 = row.insertCell(0);
                    cell1.textContent = key;
                    var cell2 = row.insertCell(1);
                    cell2.textContent = attributeValue;
                }
            }

            // Append the table to the categoryInfoElement
            categoryInfoElement.appendChild(table);
        },

        error: function (res) {
            alert("Bad thing happened! " + res.statusText);
        }
    });
}







function uploadDocument() {
const fileInput = document.getElementById("file");
const file = fileInput.files[0];

                
    var name = document.getElementById("name").value;
     var parentID =document.getElementById("parentID").value;
    var formData = new FormData();
    formData.append("file", file);
    formData.append('type',144);
    formData.append('parent_id', parentID);
    formData.append("name", name);

    var url = baseURL + '/api/v1/nodes/'

    $.ajax({
        url: url,
        
	type: "POST",
        crossDomain: true,
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false,
        // contentType: "application/x-www-form-urlencoded",
        
        headers: { 'OTCSTicket':  myTicket },
        success: function (res) {
           console.log(res);
        },
        error: function (res) {
            console.log(res);
        }
    });
}
