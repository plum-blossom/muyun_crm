<?php
  $cid=$_REQUEST['cid']+1;
  $class_index=$_REQUEST['class_index'];
  $uname=$_REQUEST['uname'];
  $tec_name=$_REQUEST['tec_name'];
  require('init.php');
    $sql = "UPDATE class_".$class_index." SET stu_name='',tec_name='' WHERE cid=$cid";
    $result=mysqli_query($conn,$sql);
    if($result){
      echo "取消成功";
    }else{
      echo "取消失败";
    }
  // }else{
  //   echo "无操作权限";
  // };


?>
