<?php
session_start();
include 'functions.php';
begin();

if(checkExist()) {
    begintable();
    $x = $_GET['X'];
    $y = $_GET['Y'];
    $r = $_GET['R'];

    foreach($x as $key => $value) {
        $value = checkX($value) ? $value: 1000;
        $point = new Point($value,$y,$r);
        if (!isset($_SESSION['Points'])) {
            $_SESSION['Points'] = array();
        }

        if (isset($_SESSION['last'])) {
            if (!$point->checklast($_SESSION['last'])) {
                $_SESSION['last'] = $point;
            }
        } else {
            $_SESSION['last'] = $point;

        }
        push($point);
        writeLASTpoints();
    }
    endtable();
}
else{

   }
end();
?>




