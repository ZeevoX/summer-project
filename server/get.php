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
                        //var_dump($exp);
                        $currentdata = str_getcsv(array_pop(file($fileinfo->getPathName())));
                        //var_dump($currentdata);
                        $data[$exp[0]] = array(
                                "v"=>$currentdata[1],
                                "u"=>$exp[1],
                                "t"=>$currentdata[0]
                        );
                        //var_dump($data[$exp[0]]);
                }
        }

        header('Content-Type:application/json;charset=utf-8');
        echo json_encode($data);
?>
