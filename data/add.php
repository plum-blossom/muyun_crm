<?php
  date_default_timezone_set('prc');
  $stu_qq=$_REQUEST['stu_qq'];
  $stu_author=$_REQUEST['stu_author'];
  $stu_class=$_REQUEST['stu_class'];
  $stu_across=$_REQUEST['stu_across'];
  $stu_cons=$_REQUEST['stu_cons'];
  $stu_date=date("Y-m-d H:i:s");
  $stu_major=$_REQUEST['stu_major'];
  $stu_money=$_REQUEST['stu_money'];
  $stu_name=$_REQUEST['stu_name'];
  $stu_phone=$_REQUEST['stu_phone'];
  $stu_school=$_REQUEST['stu_school'];
  $stu_second=$_REQUEST['stu_second'];
  $stu_totalMoney=$_REQUEST['stu_totalMoney'];
  $stu_intro=$_REQUEST['stu_intro'];
  $stu_state=$_REQUEST['stu_state'];
  $stu_source=$_REQUEST['stu_source'];
  $stu_gender=$_REQUEST['stu_gender'];
  $stu_deg=$_REQUEST['stu_deg'];
  $stu_help=$_REQUEST['stu_help'];
  $stu_assist=$_REQUEST['stu_assist'];
  $stu_count=$_REQUEST['stu_count'];
  $stu_isAll=$_REQUEST['stu_isAll'];
  $stu_lastTime=$stu_date;

  require('init.php');
  echo $_REQUEST['a'];
  $sql = "insert into stu values(null,'$stu_qq','$stu_across','$stu_author','$stu_class','$stu_cons','$stu_date','$stu_major','$stu_name',$stu_money,'$stu_phone','$stu_school','$stu_second',$stu_totalMoney,'$stu_intro','$stu_state','$stu_source','$stu_gender','$stu_deg','$stu_help','$stu_assist','$stu_count','$stu_isAll','$stu_lastTime');";
  echo $sql;
  $result=mysqli_query($conn,$sql);
  if($result){
    echo "添加成功";
  }else{
    echo "网络故障，稍后再试";
  }
?>

