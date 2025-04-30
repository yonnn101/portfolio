<?php
// Configuration
$recipient_email = "yonisisay23@gmail.com"; // Replace with your email address
$subject = "New Contact Form Submission";

// Security and validation
function sanitize_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Initialize response array
$response = [
    'success' => false,
    'message' => ''
];

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

    // Validate data
    if (empty($name) || empty($email) || empty($message)) {
        $response['message'] = "Please fill all required fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "Invalid email format.";
    } else {
        // Prepare email content
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Set email headers
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";

        // Send email
        if (mail($recipient_email, $subject, $email_content, $headers)) {
            $response['success'] = true;
            $response['message'] = "Your message has been sent successfully!";
        } else {
            $response['message'] = "Failed to send message. Please try again later.";
        }
    }
}

// If it's an AJAX request, return JSON
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// If it's a regular form submission, redirect back with status
if ($response['success']) {
    header("Location: index.html?status=success#contact");
} else {
    header("Location: index.html?status=error&message=" . urlencode($response['message']) . "#contact");
}
exit;
?>
