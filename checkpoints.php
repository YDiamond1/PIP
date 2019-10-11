<?php
include 'functions.php';
session_start();
begin();

if(checkExist()) {
    $bool = false;
    begintable();
    $x = $_GET['X'];
    $y = $_GET['Y'];
    $r = $_GET['R'];

    if (!checklast($x, $y, $r)) {

        foreach ($x as $key => $value) {
            $value = checkX($value) ? $value : 1000;
            $point = new Point($value, $y, $r);
            if (!isset($_SESSION['Points'])) {
                $_SESSION['Points'] = array();
            }

            push($point);
        }
        writeLASTpoints();
        endtable();
    }
}
else {
    echo "<div class='wtf'><img class='wtf' src='https://media.giphy.com/media/LZmMH7lmHeNFe/source.gif'></div>";
    }
endhtml();

?>




