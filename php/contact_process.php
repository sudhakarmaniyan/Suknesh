<?php require 'db.php';
$stmt=$conn->prepare("INSERT INTO contacts(name,email,phone,subject,message) VALUES (?,?,?,?,?)");
$stmt->bind_param("sssss",$_POST['name'],$_POST['email'],$_POST['phone'],$_POST['subject'],$_POST['message']);
$stmt->execute(); echo "Contact submitted.";
?>