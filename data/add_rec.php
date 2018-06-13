<?php
    date_default_timezone_set('prc');
    $stu_id=$_REQUEST['stu_id'];
    $rec_person=$_REQUEST['rec_person'];
    $rec_steady=$_REQUEST['rec_steady'];
    $rec_type=$_REQUEST['rec_type'];
    $rec_content=$_REQUEST['rec_content'];
    $rec_time=date("Y-m-d H:i:s");
    require('init.php');
    $sql = "insert into records values(null,'$stu_id','$rec_person','$rec_content','$rec_type','$rec_steady','$rec_time');";
    $result=mysqli_query($conn,$sql);
    $sql="select * from records where stu_id='$stu_id'";
    $result=mysqli_query($conn,$sql);
    $list = array();
    while($row = mysqli_fetch_assoc($result)) {
        $list[]=$row;
    }
    echo json_encode($list);
?>

