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








function uploadFile() {
            var parentID = document.getElementById("parentIDFile").value;
            var fileName = document.getElementById("fileName").value;
            var fileInput = document.getElementById("file");
            var file = fileInput.files[0];

            var myBody = {
                type: "144",
                parent_id: parentID,
                name: fileName
            };

            var formData = new FormData();
            formData.append('body', JSON.stringify(myBody));
            formData.append('file', file);

            $(document).ready(function(){
                var url = baseURL+'/api/v1/nodes'; 
                $.support.cors = true;
                $.ajax({
                    url: url,
                    type: "POST",
                    crossDomain: true,
                    data: formData,
                    processData: false,
                    contentType: false,
                    headers: { "OTCSTICKET": myTicket },
                    success: function(res){
                        alert("Success!");
                        alert(res);
                    },
                    error: function(res){
                        alert("Error happened! " + res.statusText);
                        alert(res);
                        
                    }
                });
            });
        }







function getPermissions() {
    var nodeId = document.getElementById('nodeIdPerm').value;
    var permissionType = document.getElementById('permissionType').value; // Get the selected permission type

    // Construct the URL based on the selected permission type
    var url;
    if (permissionType === "none") {
        url = baseURL + '/api/v2/nodes/' + nodeId + '/permissions';
    } else {
        url = baseURL + '/api/v2/nodes/' + nodeId + '/permissions/' + permissionType;
    }

    $.ajax({
        url: url,
        type: "GET",
        crossDomain: true,
        data: {},
        dataType: "json",
        headers: { "OTCSTICKET": myTicket },
        success: function (res) {
            var results = res.results; // Get the "results" array from the response

            // Create an HTML table
            var table = '<table border="1"><tr><th>Type</th><th>Permissions</th><th>Right ID</th></tr>';
            
            // Iterate through the "results" array and populate the table rows
            for (var i = 0; i < results.length; i++) {
                var data = results[i].data.permissions;
                table += '<tr>';
                table += '<td>' + data.type + '</td>';
                table += '<td>' + data.permissions.join(', ') + '</td>';
                table += '<td>' + data.right_id + '</td>';
                table += '</tr>';
            }
            
            table += '</table>';
            
            // Display the table in the specified container
            var container = document.getElementById('tableContainer'); // Add this div to your HTML
            container.innerHTML = ''; // Clear previous content
            container.innerHTML = table;
        },
        error: function (res) {
            alert("Bad thing happened! " + res.statusText);
        }
    });
}

// function updatePermissions() {
//     var nodeId = document.getElementById('nodeIdPermUP').value;
//     var permissionType = document.getElementById('permissionTypeUP').value;

//     // Construct the URL based on the selected permission type
//     var url;
//     if (permissionType === "group") {
//         url = baseURL + '/api/v2/nodes/' + nodeId + '/permissions/group';
//     } else if (permissionType === "public") {
//         url = baseURL + '/api/v2/nodes/' + nodeId + '/permissions/public';
//     } else {
//         url = baseURL + '/api/v2/nodes/' + nodeId + '/permissions/owner';
//     }

//     // Create an object to hold the permissions you want to update
//     var permissionsToUpdate = {
//         permissions: ["see", "see_contents"], // Modify this array with the desired permissions
//         right_id: 6799, // Modify with the desired right_id
//         apply_to: 0 // Modify with the desired apply_to value
//         // Modify with the desired include_sub_types
//     };

//     // Send a PUT request to update permissions
//          $.support.cors = true;
//     $.ajax({
//         url: url,
//         type: "PUT",
//         crossDomain: true,
//         data: permissionsToUpdate,
//         dataType: "json",
      
//         headers: { "OTCSTICKET": myTicket },
//         success: function (res) {
//             alert("Permissions updated successfully");
//         },
//         error: function (res) {
//             alert("Failed to update permissions: " + res.statusText);
//         }
//     });
// }


function updatePermissions() {
            var nodeId = document.getElementById('nodeIdPermUP').value;
            var permissionType = document.getElementById('permissionTypeUP').value;
            var rightId = document.getElementById('right_id').value;
            var applyTo = document.getElementById('apply_to').value;

            // Construct the URL based on the selected permission type
            var url;
            if (permissionType === "group") {
                url = baseURL + '/api/v2/nodes/' + nodeId + '/permissions/group';
            } else if (permissionType === "public") {
                url = baseURL + '/api/v2/nodes/' + nodeId + '/permissions/public';
            } else {
                url = baseURL + '/api/v2/nodes/' + nodeId + '/permissions/owner';
            }

            // Gather selected permissions from checkboxes
            var selectedPermissions = [];
            var checkboxes = document.getElementsByName('permissions[]');
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedPermissions.push(checkboxes[i].value);
                }
            }

            // Create an object to hold the permissions you want to update
            var permissionsToUpdate = {
                permissions: selectedPermissions,
                right_id: rightId, // Use the user-input right_id
                apply_to: applyTo // Use the user-input apply_to value
                // Modify with the desired include_sub_types
            };

            // Send a PUT request to update permissions
            $.support.cors = true;
            $.ajax({
                url: url,
                type: "PUT",
                crossDomain: true,
                data: JSON.stringify(permissionsToUpdate),
                dataType: "json",
                contentType: "application/json", // Set the content type to JSON
                headers: { "OTCSTICKET": myTicket },
                success: function (res) {
                    alert("Permissions updated successfully");
                },
                error: function (res) {
                    alert("Failed to update permissions: " + res.statusText);
                }
            });
        }

