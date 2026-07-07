<?php
session_start();
if (!isset($_SESSION["admin_logged_in"])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Settings | Suknesh Admin</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="assets/css/admin.css">
</head>
<body class="p-4">
<div class="container">
<h2>Settings</h2>
<div class="card p-4 border-0 shadow rounded-4">
<p><strong>Company:</strong> Suknesh Techcenter LLP</p>
<p><strong>Email:</strong> sukneshtechcenter@gmail.com</p>
<p><strong>Address:</strong> 104 Celebrity Classic Layout, Electronic City, Bengaluru – 560100</p>
<p class="text-danger">Security note: Change the default admin username/password before deployment.</p>
<a href="dashboard.php" class="btn btn-primary">Back to Dashboard</a>
</div>
</div>
</body>
</html>
