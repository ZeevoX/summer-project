<?php
        header('Access-Control-Allow-Origin: *');
        putenv('LANG=en_US.UTF-8');

        // Each sensor in the array has two properties:
        // v    value
        // u    units for value
        // t    unix timestamp

        $dir = new DirectoryIterator(dirname(__FILE__) . '/data/');
        foreach ($dir as $fileinfo) {
                if (!$fileinfo->isDot()) {
                        $name = $fileinfo->getFilename();
                        $exp = explode("_", str_replace(".csv", "", $name));
                        $last = array_pop($exp);                        // https://stackoverflow.com/a/16610896
                        $exp = array(implode('_', $exp), $last);

                        $csv = array_map('str_getcsv', file($fileinfo->getPathName()));
                        $max_row = $csv[0];
                        $min_row = $csv[0];
                        foreach ($csv as $row) {
                                if ($max_row[1] < $row[1]) {
                                        $max_row = $row;
                                }
                                if ($min_row[1] > $row[1]) {
                                        $min_row = $row;
                                }
                        }

                        $currentdata = str_getcsv(array_pop(file($fileinfo->getPathName())));
                        $data[$exp[0]] = array(
                                "v"=>$currentdata[1],
                                "max"=>$max_row[1],
                                "maxt"=>$max_row[0],
                                "min"=>$min_row[1],
                                "mint"=>$min_row[0],
                                "u"=>$exp[1],
                                "t"=>$currentdata[0]
                        );
                }
        }

        header('Content-Type:application/json;charset=utf-8');
        echo json_encode($data);
?>
