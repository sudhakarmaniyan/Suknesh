<?php require 'db.php';
$stmt=$conn->prepare("INSERT INTO quotes(customer_name,company_name,email,phone,service,description,budget,delivery_date,file_name) VALUES (?,?,?,?,?,?,?,?,?)");
$f=''; if(isset($_FILES['file'])){$f=basename($_FILES['file']['name']); @move_uploaded_file($_FILES['file']['tmp_name'],"uploads/".$f);}
$stmt->bind_param("sssssssss",$_POST['customer_name'],$_POST['company_name'],$_POST['email'],$_POST['phone'],$_POST['service'],$_POST['description'],$_POST['budget'],$_POST['delivery_date'],$f);
$stmt->execute(); echo "Quote submitted.";
?>