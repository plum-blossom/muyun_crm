<?php
  header("Content-Type:text/plain;charset=utf-8");
    $stu_id=$_REQUEST['stu_id'];
    require('init.php');
    $sql="select * from stu where stu_id=$stu_id";
    $result=mysqli_query($conn,$sql);
    $row1=mysqli_fetch_assoc($result);
    $sql="select * from records where stu_id=$stu_id";
    $result=mysqli_query($conn,$sql);
    $list = array();
    while($row = mysqli_fetch_assoc($result)) {
        $list[]=$row;
    }
    if($row1!=null){
      $output=array("stu_detail"=>$row1,"stu_rec"=>$list);
	echo json_encode($output);
    }else{
      echo "网络故障";
    }



?>
