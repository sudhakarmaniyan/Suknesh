<?php
require 'config.php';
$name=$_POST['name']??'';
$email=$_POST['email']??'';
$phone=$_POST['phone']??'';
$service=$_POST['service']??'';
$message=$_POST['message']??'';
$stmt=$conn->prepare("INSERT INTO enquiries(name,email,phone,service,message) VALUES (?,?,?,?,?)");
$stmt->bind_param("sssss",$name,$email,$phone,$service,$message);
$stmt->execute();
echo "Thank you. Your enquiry has been received.";
?>