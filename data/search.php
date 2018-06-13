<?php
  header("Content-Type:text/plain;charset=utf-8");
  $val=$_REQUEST['val'];
  require('init.php');
  $sql1="select * from stu where stu_name like '%$val%'";
  $sql2="select * from stu where stu_qq like '%$val%'";
  $sql3="select * from stu where stu_phone like '%$val%'";
  $result1=mysqli_query($conn,$sql1);
  $result2=mysqli_query($conn,$sql2);
  $result3=mysqli_query($conn,$sql3);
  $list = array();
	if (mysqli_num_rows($result1) > 0){
    while($row = mysqli_fetch_assoc($result1)) {
      $list[]=$row;
    }
  }elseif(mysqli_num_rows($result2) > 0){
    while($row = mysqli_fetch_assoc($result2)) {
      $list[]=$row;
    }
  }elseif(mysqli_num_rows($result3) > 0){
    while($row = mysqli_fetch_assoc($result3)) {
      $list[]=$row;
    }
  }else{
  }
 echo JSON_encode($list);
?>
