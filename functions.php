<?php

class Point{
    var $x;
    var $y;
    var $r;
    var $isHitting;
    var $time;
    var $isWrongargumentos = false;

    public function Point($x, $y, $r){
        $this->time = microtime(true);
        $this->x = $x;
        $this->y = $y;
        $this->r = $r;
        check();
    }
    public function check(){
        if (checkPoints($this->x,$this->y, $this->r)) {
            if (checknumericpoints($this->x, $this->y, $this->r)) {
                $this->isHitting=true;
            }
            else {
                $this->isHitting=false;
            }
        } else {
            $this->isWrongargumentos = true;
        }
        $this->time = microtime(true) - $this->time;
    }



    function checklast($last){
        if($last->x==$this->x && $this->y==$last->y && $this->r==$last->r) return true;
        return false;
    }



}
function checkpunc(&$value){
    if(strpos($value)!==false){
        replace(',','.', $value);
    }
}
function push($point){
    array_push($_SESSION['Points'],$point);
}



function checkExist(){
    if(isset($_GET['X']) && isset($_GET['Y']) && isset($_GET['R']))
        return true;
    return false;
}

function checkPoints($xvalue , $yvalue, $rvalue){
    checkpunc($xvalue);
    checkpunc($yvalue);
    checkpunc($rvalue);
    if(is_numeric($xvalue) && is_numeric($yvalue) && is_numeric($rvalue)){
        if  ((-5<=$xvalue && $xvalue<=3)
            && (-3<=$yvalue && 5>=$yvalue)
            && (1<=$rvalue && $rvalue<=4))
        return true;
    }
    return false;

}
function checknumericpoints($x,$y,$r){
    if($x<0 && $y>0){
        if($x>=(-1)*$r/2 && $y<=$r) return true;
    }
    elseif($x>=0 && $y<=0){
        if($x*$x + $y*$y <= ($r/2) * ($r/2)) return true;
    }
    elseif($x>=0 && $y>=0){
        if((-1)*$x+$r<= $y) return true;
    }

    return false;
}
function outputItem($point){
    echo "<tr><td>".$point->x."</td><td>".$point->y."</td><td>".$point->r."</td><td>".$point->isHitting."</td><td>".$point->time."</td></tr>";
}
function outputWrong(){
    echo "<tr><td>wrongparametrs</td></tr>";
}
function end(){
    echo "</body> </html>";
}
function begin(){
    echo "<!DOCTYPE HTML> <html> <head> 
            <meta charset='UTF-8'>
            <title>Points</title>
            <link rel='shortcut icon' href='img/favicon.ico'>
            <link rel='stylesheet' type='text/css' href='css/inputstyles.css>
            </head>
            <body>";
}
function begintable(){
    echo "<div class='container'> <br> <table class='points'>
            <tr>  <td>X</td> <td>Y</td> <td>R</td> <td>CHECK</td> <td>SCRIPT TIME</td>  </tr> ";
}
function endtable(){
    echo "</table> <br> </div>";
}
function writeLASTpoints()
{
    for ($i = 0; $i < count($_SESSION['Points']); $i++) {
        if (!$_SESSION['Points'][$i]->isWrongargumentos) {
            outputItem($_SESSION['Points'][$i]);
        } else {
            outputWrong();
        }
    }
}


function checklast($array){
    if(isset($_SESSION['last'])) {
        for ($i = 0; $i < 3; $i++) {
            if ($_SESSION['last'][$i] !== $array[$i])
                return false;
        }
    }
    return true;
}
function checkX($x){
    $correct = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
    return in_array($x, $correct);
}
?>