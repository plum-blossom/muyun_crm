<?php
  header("Content-Type:text/plain;charset=utf-8");
  require('init.php');
  $sql="SELECT uid,uname FROM users where dept='咨询部';";
  $result=mysqli_query($conn,$sql);
  $list = array();
  while($row = mysqli_fetch_assoc($result)) {
      $list[]=$row;
  }
	echo json_encode($list);
?>
