<?php
date_default_timezone_set('prc');
$now=date("Y-m-d H:i:s");
require('init.php');
function getList($rerm,$conn){
	$arr=array();
	$sql_bas="
  		SELECT * from(
		    SELECT DISTINCT
		    stu.stu_id,
		    stu.stu_name,
		    stu.stu_lastTime,
		    stu.stu_consultant,
		    CASE
		    WHEN rec_time IS NOT NULL THEN
		      (SELECT MAX(rec_time) FROM records where stu.stu_id = records.stu_id)
		    ELSE
		      stu_lastTime
		      END AS rec_time
		    FROM
		    stu
		    LEFT JOIN records ON stu.stu_id = records.stu_id
  		) aa where ";
  	$sql=$sql_bas.$rerm;
  	$result=mysqli_query($conn,$sql);
  	while($row = mysqli_fetch_assoc($result)) {
  		$arr[]=$row;
  	}
  	return $arr;
}
$rerm_1="TIMESTAMPDIFF(DAY,aa.rec_time,now()) between 0 AND 1";
$rerm_7="TIMESTAMPDIFF(DAY,aa.rec_time,now()) between 2 AND 5";
$rerm_15="TIMESTAMPDIFF(DAY,aa.rec_time,now()) between 6 AND 16";
$list_1=getList($rerm_1,$conn);
$list_7=getList($rerm_7,$conn);
$list_15=getList($rerm_15,$conn);
$output=array("list_1"=>$list_1,"list_7"=>$list_7,"list_15"=>$list_15);
echo json_encode($output);
?>


