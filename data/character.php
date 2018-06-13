<?php
header("Content_type:text/html;charset=utf-8");
$str='insert into character_list values(null';
foreach ($_REQUEST as $key => $value)
{
    
    if($value=='good'){
        break; // 当 $value为c时，终止循环
    }
    $str.=",'$value'";
}
$str.=');';
require('init.php');
$result=mysqli_query($conn,$str);
if($result){
  echo "ok";
}else{
  echo "网络故障，稍后再试";
}
?>





