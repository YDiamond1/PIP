var validY = false;
var validX = false;
var validR = false;
var zero = 200;
var rConstLenght = 150;

function xChoose(x) {

    var field = document.getElementById('X_field');

    if (field.value == x) {
        field.value = "";
        document.getElementById("x" + x).classList.remove('sel');
        validX=false;
    } else {
        if (field.value !== "") {
            document.getElementById("x" + field.value).classList.remove('sel');
        }
        field.value = x;
        document.getElementById("x" + x).classList.add('sel');
        validX=true;
    }
    hidddenSub();
}

function yChoose() {

    var field = document.getElementById('Y_field');
    var txt = field.value.match(/^[0-4]{1}[\,|\.]{1}\d{1,}$|^-[0-4]{1}[\,\.]\d{1,}$|^[0-4]$|^-[0-4]$/m);

    if (txt !== null && ( "-0" !== txt )) {
        validY=true;
        if (field.classList.contains("invalid"))
            field.classList.remove("invalid");
    } else {
        validY=false;
        field.classList.add("invalid");
    }
hidddenSub();
}

function rChoose(r) {

    var field = document.getElementById('R_field');

    if (field.value === r) {
        field.value = "";
        document.getElementById("r" + r).classList.remove('sel');
        validR=false;
    } else {
        if (field.value !== "") {
            document.getElementById("r" + field.value).classList.remove('sel');
        }
        field.value = r;
        document.getElementById("r" + r).classList.add('sel');
        var r_text = document.getElementById("r_span");
                r_text.style.display="none";
        validR=true;
    }
    hidddenSub();

}

function draw() {

    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {

        canvas.addEventListener('click', canvasClicked, false);

        function canvasClicked(e) {

            xCanvas = e.pageX - e.target.offsetLeft;
            yCanvas = e.pageY - e.target.offsetTop;
            x = xCanvas;
            y = yCanvas;


            if (x >= zero) {
                x = x - zero
            } else {
                x = -(zero - x);
            }

            if (y <= zero) {
                y = zero - y;
            } else {
                y = -(y - zero);
            }

            if (validR){
                console.log(x+" "+y);
                check(x,y);
            }
            else{
                var r_text = document.getElementById("r_span");
                r_text.style.display="block";
            }

        }

    }
}

function check(x,y) {
        var r = document.getElementById("R_field").value;
        x = Math.round(x / rConstLenght * r);
        y = y / rConstLenght * r;


        if ((-5 < x) && (x < 3) && (-5 < y) && (y < 5)) {

            var fieldX = document.getElementById('X_field');
            var fieldY = document.getElementById('Y_field');
            if ( fieldX.value !== "" ) {
                document.getElementById("x" + fieldX.value).classList.remove('sel');
            }
            fieldX.value = x;
            fieldY.value = y;

            document.getElementById("x" + x).classList.add('sel');

            validY =true;
            validX = true;
        }
    hidddenSub();

}

function hidddenSub(){
    var sub = document.getElementById("submit");
    if (validX&&validY&&validR) {
        sub.style.display="block";
    } else{
       sub.style.display="none"; 
    }
}

function drawR(res, xN, yN ,rN) {
    var xCanvas = 0;
    var yCanvas = 0;
    if (res!=='-1'){
        if (xN<0){
            xCanvas = 175 - Math.abs(xN)/rN*150;
        } else {
            xCanvas = 175 + xN/rN*150;
        }
        if (yN<0){
            yCanvas = 175 + Math.abs(yN)/rN*150;
        } else {
            yCanvas = 175 - yN/rN*150;
        }

        pointDraw(res, xCanvas,yCanvas);
    }
}


function pointDraw(r, xCanvas, yCanvas) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        if (r!==0){
            ctx.fillStyle = "#470005";}
        else {
            ctx.fillStyle = "rgba(91,234,65,0.68)";
        }
        ctx.moveTo(125, 35);
        ctx.arc(xCanvas, yCanvas, 6, 0, 2 * Math.PI);
        ctx.fill();
    }
}