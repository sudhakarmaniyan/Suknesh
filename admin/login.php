<?php
session_start();

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"] ?? "";
    $password = $_POST["password"] ?? "";

    if ($username === "admin" && $password === "admin123") {
        $_SESSION["admin_logged_in"] = true;
        header("Location: dashboard.php");
        exit;
    } else {
        $error = "Invalid username or password.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Login | Suknesh Techcenter LLP</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container">
<div class="row justify-content-center align-items-center min-vh-100">
<div class="col-md-5">
<div class="card shadow border-0 rounded-4 p-4">
<h3 class="text-center mb-4">Admin Login</h3>
<?php if ($error): ?>
<div class="alert alert-danger"><?php echo $error; ?></div>
<?php endif; ?>
<form method="post">
<div class="mb-3">
<label class="form-label">Username</label>
<input class="form-control" name="username" required>
</div>
<div class="mb-3">
<label class="form-label">Password</label>
<input type="password" class="form-control" name="password" required>
</div>
<button class="btn btn-primary w-100">Login</button>
</form>
<p class="small text-muted mt-3 mb-0">Default: admin / admin123. Change before deployment.</p>
</div>
</div>
</div>
</div>
</body>
</html>
