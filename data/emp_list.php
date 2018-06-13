<?php
  header("Content-Type:text/plain;charset=utf-8");
  require('init.php');
  $sql="select uid,uname,email,isAdmin,posts,dept,u_date,off_duty from users order by dept";
	$result=mysqli_query($conn,$sql);
  $list_users = array();
  while($row = mysqli_fetch_assoc($result)) {
      $list_users[]=$row;
  }
  $mon=date('n');
  $sql="select * from emps_task where mon=$mon";
	$result=mysqli_query($conn,$sql);
  $list_task = array();
  while($row = mysqli_fetch_assoc($result)) {
      $list_task[]=$row;
  }
	$output=array("list_users"=>$list_users,"list_task"=>$list_task);
	echo json_encode($output);
?>
