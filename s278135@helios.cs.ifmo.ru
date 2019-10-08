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
    echo "не существует";
   }
endhtml();
?>




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
    if(strpos($value,",")!==false){
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
    echo "<tr>wrongparametrs</tr>";
}
function endhtml(){
    echo "</body>
          </html>";
}
function begin(){
    echo "<!DOCTYPE HTML> <html> 
            <head> 
            <meta charset='UTF-8'>
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
    for ($i = 0; $i < count($_SESSION['Points']); $i++) {
        if (!$_SESSION['Points'][$i]->isWrongargumentos) {
            outputItem($_SESSION['Points'][$i]);
        } else {
            outputWrong();
        }
    }
}



function checkX($x){
    $correct = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
    return in_array($x, $correct);
}
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link type="text/css" href="css/Styles.css" rel="stylesheet">
    <link type="text/css" href="css/inputstyles.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Bangers&display=swap" rel="stylesheet">
    <script src="js/scripts.js"></script>
    <title>Title</title>
    <script>
        let acсess=false;
    </script>
</head>
<body>
    <div class="header">
        <div class = "intro">
    Dmitri vyatkin P3202
        </div>
    </div>
<div class="container">
    <div class="tasks">
        <form class = "input"  action="checkpoints.php" method="get" onsubmit="submitForm()">
                <div class="inputitems">
                    <div class = "X">
                        <div class="label">X:</div>
                    </div>
                    <table class="X-table">
                        <tbody id="X-in">
                            <tr>
                                <td>-5</td><td><input id="1" type="checkbox"  name="X[]" value="-5"></td>
                                <td>-2</td><td><input id="2" type="checkbox" name="X[]" value="-2"></td>
                                <td> 1</td><td><input id="3" type="checkbox" name="X[]" value="1"></td>
                            </tr>
                            <tr>
                                <td>-4</td><td><input id="4" type="checkbox" name="X[]" value="-4"></td>
                                <td>-1</td><td><input id="5" type="checkbox" name="X[]" value="-1"></td>
                                <td>2</td><td><input id="6" type="checkbox" name="X[]" value="2"></td>
                            </tr>
                            <tr>
                                <td>-3</td><td><input id="7" type="checkbox" name="X[]" value="-3"></td>
                                <td>0</td><td><input id="8" type="checkbox" name="X[]" value="0"></td>
                                <td>3</td><td><input id="9" type="checkbox" name="X[]" value="3"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="textinput">


                        <div class="label">
                        <label for="yV" id="resultY">Y:</label>
                        </div>
                        <div class="input">
                        <input type="text" maxlength="5" size="6" id="yV"  oninput="checkY(this.value)" name="Y" placeholder=" от -3 до 5" >

                        </div>


                        <div class="label">
                            <label for="rV" id="resultR">R:</label>
                        </div>
                        <div class="input">
                        <input type="text" maxlength="5" size="6" id="rV" oninput="checkR(this.value)" name="R"  placeholder=" от 1 до 4">
                        </div>
                    </div>
                    <input type="submit" id="sub"  placeholder="send">
                </div>
            </form>

        <div class="img">
            <img src="img/areas.png">

        </div>
    </div>
    <div class = "result">
        <iframe class = "output" name="graphics"> </iframe>
    </div>
</div>
</body>
</html>