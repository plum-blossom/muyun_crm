<?php
  
  require('init.php');
  $data=$_REQUEST['data'];
  $info_time=$_REQUEST['info_time'];
  for($i=0;$i<count($data);$i++){
    $uid=$data[$i]["uid"];
    $visit=$data[$i]["visit"];
    $info=$data[$i]["info"];
    $sql="insert into emps_data values(null,$uid,$info,$visit,'$info_time')";
    $result=mysqli_query($conn,$sql);
    echo $sql;
  }
  
?>
