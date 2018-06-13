<?php
  
  require('init.php');
  $uid=$_REQUEST['uid'];
  $task_mon=$_REQUEST['task_mon'];
  $emp_task=$_REQUEST['emp_task'];
  $emp_task_money=$_REQUEST['emp_task_money'];
  $sql="select mon from emps_task where uid=$uid and mon=$task_mon;";
  $result=mysqli_query($conn,$sql);
  $row = mysqli_fetch_assoc($result);
  if($row!=null){
    $sql="update emps_task set emp_task=$emp_task,emp_task_money=$emp_task_money where uid=$uid and mon=$task_mon;";
    $result=mysqli_query($conn,$sql);
    if($result){
      echo 1;
    }else{
      echo 0;
    }
  }else{
    $sql="insert into emps_task values(null,$uid,$emp_task,$emp_task_money,$task_mon);";
    $result=mysqli_query($conn,$sql);
    if($result){
      echo 1;
    }else{
      echo 0;
    }
 }
?>
