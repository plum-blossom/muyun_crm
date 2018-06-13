<?php
  header("Content-Type:text/plain;charset=utf-8");
   $currentPage=$_REQUEST['currentPage'];
  if($currentPage==null){
    $currentPage=2;
  }
  $pageSize=10;
  $start=($currentPage-1)*$pageSize;
  require('init.php');
  $sql="select * from stu limit $start,$pageSize";
	$result=mysqli_query($conn,$sql);
  $list = array();
  while($row = mysqli_fetch_assoc($result)) {
      $list[]=$row;
  }
  $sql="SELECT count(*) FROM stu";
  $result=mysqli_query($conn,$sql);
  $row=mysqli_fetch_row($result);
  $total=$row[0];
  $totalPage=ceil($total/$pageSize);
	$output=array("totalPage"=>$totalPage,"data"=>$list);
	echo json_encode($output);
?>
