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
        $this->check();
    }
    public function check(){
        if (checkPoints($this->x,$this->y, $this->r)) {
            $this->isHitting=checknumericpoints($this->x, $this->y, $this->r) ? "HIT" : "miss";
        } else {
            $this->isWrongargumentos = true;
        }
        $this->time = microtime(true) - $this->time;
    }


}
function checklast($X, $Y, $R){
    if (isset($_SESSION['last'])) {
        $_SESSION['last']['X']=$X;
        $_SESSION['last']['Y']=$Y;
        $_SESSION['last']['R']=$R;
        return false;
    }
    return (checkXlast($X) &&  $Y==$_SESSION['last']['Y'] && $R==$_SESSION['last']['R']);
}
function checkXlast($X){
    $last = $_SESSION['last']['X'];
    if(count($last) == count($X)){
        foreach ($X as $key => $value){
            if(!in_array($value,$last)){
                return false;
            }
        }
    }
    return true;
}

function checkpunc(&$value){
    if(strpos($value,",")!==false){
        replace(',','.', $value);
    }
}

function push($point){
    array_push($_SESSION['Points'],$point);
}

function checkExist(){
     return (isset($_GET['X']) && isset($_GET['Y']) && isset($_GET['R']));
}

function checkPoints($xvalue , $yvalue, $rvalue){
    checkpunc($xvalue);
    checkpunc($yvalue);
    checkpunc($rvalue);
    if(is_numeric($xvalue) && is_numeric($yvalue) && is_numeric($rvalue)){
        return  ((-5<=$xvalue && $xvalue<=3)
            && (-3<=$yvalue && 5>=$yvalue)
            && (1<=$rvalue && $rvalue<=4));
    }
    return false;

}
function checknumericpoints($x,$y,$r){
    if($x<0 && $y>0){
        return ($x>=(-1)*$r/2 && $y<=$r);
    }
    elseif($x>=0 && $y>=0){
        return ((-1)*$x+$r>= $y);
    }
    elseif($x>0 && $y<0){
        return ($x*$x + $y*$y <= ($r/2) * ($r/2));
    }

    return false;
}

function outputItem($point){
    echo "<tr><td>".$point->x."</td><td>".$point->y."</td><td>".$point->r."</td><td>".$point->isHitting."</td><td>".number_format($point->time,7,".","")."s</td></tr>";
}

function outputWrong(){
    echo "<tr><td colspan='6'>wrongparametrs</td></tr>";
}

function endhtml(){
    echo "</body>
          </html>";
}

function begin(){
    echo "<!DOCTYPE HTML> <html> 
            <head> 
            <meta charset='UTF-8'>
            <link type='text/css' rel='stylesheet' href='css/Styles.css'>
            
            <title>Points</title>
            </head>
            <body>";
}

function begintable(){
    echo "<div class='container'> <br> <table class='points'>
            <tr>  <td>X</td> <td>Y</td> <td>R</td> <td>CHECK</td> <td>SCRIPT TIME</td>  </tr> ";
}

function endtable(){
    echo "</table></div>";
}

function writeLASTpoints()
{
    for ($i=count($_SESSION['Points'])-1; $i>=count($_SESSION['Points'])-10;$i--) {
        $point=$_SESSION['Points'][$i];
        if(!isset($point)){
            break;
        }
        if (!$point->isWrongargumentos) {
            outputItem($point);
        } else {
            outputWrong();
        }
    }
}

function checkX($x){
    $correct = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
    return in_array($x, $correct);
}
?>