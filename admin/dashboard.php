<?php
session_start();
if (!isset($_SESSION["admin_logged_in"])) {
    header("Location: login.php");
    exit;
}
require "../php/config.php";

$total = $conn->query("SELECT COUNT(*) AS total FROM enquiries")->fetch_assoc()["total"] ?? 0;
$latest = $conn->query("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 50");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dashboard | Suknesh Techcenter LLP</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="assets/css/admin.css">
</head>
<body>
<div class="container-fluid">
<div class="row">
<div class="col-md-3 col-lg-2 sidebar p-4">
<h5 class="mb-4">Suknesh Admin</h5>
<a href="dashboard.php">Dashboard</a>
<a href="enquiries.php">Enquiries</a>
<a href="settings.php">Settings</a>
<a href="logout.php">Logout</a>
</div>
<div class="col-md-9 col-lg-10 p-4">
<h2 class="fw-bold mb-4">Admin Dashboard</h2>
<div class="row g-4 mb-4">
<div class="col-md-4">
<div class="card dashboard-card p-4">
<h6>Total Enquiries</h6>
<h2><?php echo $total; ?></h2>
</div>
</div>
<div class="col-md-4">
<div class="card dashboard-card p-4">
<h6>Business Email</h6>
<p class="mb-0">sukneshtechcenter@gmail.com</p>
</div>
</div>
<div class="col-md-4">
<div class="card dashboard-card p-4">
<h6>Office</h6>
<p class="mb-0">Electronic City, Bengaluru</p>
</div>
</div>
</div>

<div class="card table-card p-4">
<div class="d-flex justify-content-between align-items-center mb-3">
<h4>Latest Enquiries</h4>
<button class="btn btn-success" onclick="exportTableToCSV()">Export CSV</button>
</div>
<input id="searchInput" onkeyup="filterTable()" class="form-control mb-3" placeholder="Search enquiries">
<table class="table table-bordered table-striped" id="enquiryTable">
<thead>
<tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Date</th></tr>
</thead>
<tbody>
<?php while ($row = $latest->fetch_assoc()): ?>
<tr>
<td><?php echo $row["id"]; ?></td>
<td><?php echo htmlspecialchars($row["name"]); ?></td>
<td><?php echo htmlspecialchars($row["email"]); ?></td>
<td><?php echo htmlspecialchars($row["phone"]); ?></td>
<td><?php echo htmlspecialchars($row["service"]); ?></td>
<td><?php echo $row["created_at"]; ?></td>
</tr>
<?php endwhile; ?>
</tbody>
</table>
</div>
</div>
</div>
</div>
<script src="assets/js/admin.js"></script>
</body>
</html>
