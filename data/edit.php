<?php
  date_default_timezone_set('prc');
  require('init.php');
  $stu_id=$_REQUEST['stu_id'];
  $stu_money=$_REQUEST['stu_money'];
  $stu_lastTime=date("Y-m-d H:i:s");
  $sql = "UPDATE stu SET stu_money=$stu_money,stu_lastTime='$stu_lastTime' WHERE stu_id=$stu_id;";
  $result=mysqli_query($conn,$sql);
  if($result){
    $sql="select * from stu where stu_id=$stu_id;";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    if($row!=null){
      echo json_encode($row);
    }else{
      echo "网络故障";
    }
  }else{
    echo "失败";
  }
?>
