<?php
  header("Content-Type:text/plain;charset=utf-8");
    $uid=$_REQUEST['uid'];
    require('init.php');
    $sql="update users set off_duty=0 where uid=$uid;";
    $result=mysqli_query($conn,$sql);
    if($result){
      echo 1;
    }else{
      echo 0;
    }

?>
