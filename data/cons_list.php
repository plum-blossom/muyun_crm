<?php
  header("Content-Type:text/plain;charset=utf-8");
  date_default_timezone_set('prc');
  require('init.php');
  $sql="select uname,uid from users where dept='咨询部';";
	$result=mysqli_query($conn,$sql);
  $cons_list = array();
  while($row = mysqli_fetch_assoc($result)) {
      $cons_list[]=$row;
  }
  $month=date('m');
  $sql="select * from emps_data where date like '%2018-$month%'";
	$result=mysqli_query($conn,$sql);
  $cons_info= array();
  while($row = mysqli_fetch_assoc($result)) {
      $cons_info[]=$row;
  }
  $sql="select * from stu where stu_lastTime like '%2018-$month%'";
	$result=mysqli_query($conn,$sql);
  $stu_money = array();
  while($row = mysqli_fetch_assoc($result)) {
      $stu_money[]=$row;
  }
  $mon=date('n');
  $sql="select * from emps_task where mon=$mon";
	$result=mysqli_query($conn,$sql);
  $emps_task = array();
  while($row = mysqli_fetch_assoc($result)) {
      $emps_task[]=$row;
  }
  $output=array("cons_list"=>$cons_list,"cons_info"=>$cons_info,"stu_money"=>$stu_money,"emps_task"=>$emps_task);
	echo json_encode($output);   
?>
