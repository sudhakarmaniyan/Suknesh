<?php
require '../php/config.php';
$r=$conn->query("SELECT * FROM enquiries ORDER BY created_at DESC");
?><!DOCTYPE html><html><head><title>Admin</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></head>
<body class="p-4"><h2>Enquiries</h2>
<table class="table table-bordered"><tr><th>ID</th><th>Name</th><th>Email</th><th>Service</th><th>Date</th></tr>
<?php while($row=$r->fetch_assoc()){ ?>
<tr><td><?=$row['id']?></td><td><?=htmlspecialchars($row['name'])?></td><td><?=htmlspecialchars($row['email'])?></td><td><?=htmlspecialchars($row['service'])?></td><td><?=$row['created_at']?></td></tr>
<?php } ?>
</table></body></html>