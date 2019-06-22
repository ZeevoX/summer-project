<?php
	$data = json_decode(base64_decode($_GET['data']), true);
//	print_r($data);
	$ts = $data["time"];
	unset($data["time"]);
	foreach($data as $sensorname => $sensor) {
		$line = array();
		array_push($line, $ts, $sensor["v"]);
		$handle = fopen(__DIR__ . "/data/" . $sensorname . "_" . $sensor["u"] . ".csv", "a");
		fputcsv($handle, $line);
		fclose($handle);
	}
?>
