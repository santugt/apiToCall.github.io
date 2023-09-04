<?php
// Allow requests from any origin
header('Access-Control-Allow-Origin: *');

// Allow specified HTTP methods (GET and POST in this example)
header('Access-Control-Allow-Methods: GET, POST');

// Allow additional headers to be sent with the request
header("Access-Control-Allow-Headers: X-Requested-With");

// Handle the file upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Process the file upload here
    // You can access the uploaded file using $_FILES['file']
    // Example: move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/' . $_FILES['file']['name']);
    // You should also perform validation and error handling as needed.
    
    // Send a response back to the client, for example:
    $response = [
        'message' => 'File uploaded successfully',
    ];
    
    // Send the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Handle other types of requests or return an error if needed
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Method not allowed']);
}
?>

