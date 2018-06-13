<?php
  header("Content-Type:text/plain;charset=utf-8");
    $email=$_REQUEST['uname'];
    $password=$_REQUEST['pwd'];
    require('init.php');
    $sql="select * from users where email='$email' and pwd='$password'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    if($row!=null){
      echo json_encode($row);
    }else{
      echo "用户名密码错误";
    }

?>
