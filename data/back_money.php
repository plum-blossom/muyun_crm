<?php
  header("Content-Type:text/plain;charset=utf-8");
  require('init.php');
  $sql="select * from stu where stu_money<1";
  $result=mysqli_query($conn,$sql);
  $list = array();
  while($row = mysqli_fetch_assoc($result)) {
    $list[]=$row;
  }
  echo JSON_encode($list);
?>
