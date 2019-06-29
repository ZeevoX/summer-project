<?php
  header('Access-Control-Allow-Origin: *');
	// Take sensor readings from lm-sensors and output
	// this script returns JSON
	// each sensor in the array has two properties:
	// v 	value
	// u	units for value
	putenv('LANG=en_US.UTF-8');

	if (isset($_GET['help'])) {
		echo "This PHP script takes server sensor readings from lm-sensors and outputs the values in JSON format.\nEach sensor in the array has two properties:\nv\tvalue\nu\tunits\n\n";
	}

	$exec = explode(" ", trim(shell_exec("sensors | grep 'fan1' | sed 's/.*://' | sed 's/(.*//'")));
	$data['fan1'] = array(
		"v"=>$exec[0],
		"u"=>$exec[1],
	);
        $exec = trim(shell_exec("sensors | grep 'temp1' | sed 's/.*://' | sed 's/(.*//'"));
	$value = floatval(substr($exec, 0, -3));

	$units = substr($exec, -3);
        $data['temp1'] = array(
                "v"=>$value /*this commented code is for formatting to 1dp: sprintf('%0.1f', $value)*/,
                "u"=>$units,
        );
	header('Content-Type:application/json;charset=utf-8');
	echo json_encode($data);
?>
