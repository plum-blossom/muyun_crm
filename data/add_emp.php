<?php
  $emp_name=$_REQUEST['emp_name'];
  $emp_email=$_REQUEST['emp_email'];
  $emp_admin=$_REQUEST['emp_admin'];
  $emp_posts=$_REQUEST['emp_posts'];
  $emp_dept=$_REQUEST['emp_dept'];
  $emp_admin=$_REQUEST['emp_admin'];
  $emp_phone=$_REQUEST['emp_phone'];
  $u_date=$_REQUEST['u_date'];

  require('init.php');
  $sql = "insert into users values(null,'$emp_name','tedu2018','$emp_phone','$emp_email',$emp_admin,'$emp_posts','$emp_dept','$u_date',1);";
  $result=mysqli_query($conn,$sql);
  if($result){
    echo 1;
  }else{
    echo 0;
  }
?>

