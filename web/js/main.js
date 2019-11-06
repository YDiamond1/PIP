var validY = false;
var validX = false;
var validR = false;
var zero = 200;
var rConstLenght = 150;
var XCurrent=0;
var YCurrent=0;

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
            x = (XCurrent=xCanvas);
            y = (YCurrent=yCanvas);


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
                check(x,y);
            }
            else{
                var r_text = document.getElementById("r_span");
                r_text.style.display="block";
            }

        }

    }
}

function checkNumericParameters(x,y,r){

    var partOFcircle = ((x<=0 && y>=0) && (x*x + y*y<=r*r));
    var triangle = (x>=0 && y>=0 && ((-2)*x >= y-r));

    var rectangle = ((x<=0 && y<=0) && ( x>=(-1*r) && y>=(-1)*r/2));
    return partOFcircle || triangle || rectangle;
}
function check(x,y) {
        var r = document.getElementById("R_field").value;

        x = Math.round(x / rConstLenght * r * 10000)/10000;
        y = Math.round(y / rConstLenght * r *10000)/10000;
        var hit = checkNumericParameters(x,y,r);
        pointDraw(hit, XCurrent,YCurrent);
        if ((-5 < x) && (x < 3) && (-5 < y) && (y < 5)) {
            x = Math.round(x);
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

function sendForm(event){
    event.preventDefault();
    fetch("./controller?X="+X_field.value+"&Y="+Y_field.value+"&R="+R_field.value)
        .then(resp => resp.json())
        .then(addResponse);
}

function addResponse(response) {
    var caption = document.getElementsByClassName("caption");
    var i=2;
    $('.row>.column:first-child').text(function (index, value) {
        console.log(value);
        if(value!="N"){
            this.innerHTML++;
        }
    });
    var row = document.createElement("div").classList.add("row");

    $('.caption').after("<div class='row'>"+
        "<div class=\"column\">1</div>\n" +
        "<div class=\"column\">"+response.x+"</div>\n" +
        "<div class=\"column\">"+response.y+"</div>\n" +
        "<div class=\"column\">"+response.r+"</div>\n" +
        "<div class=\"column\">"+response.hit+"</div>"+
        "</div>");

}
function pointDraw(r, xCanvas, yCanvas) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {

        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        if (!r){
            ctx.fillStyle = "#470005";
        }
        else {
            ctx.fillStyle = "rgba(91,234,65,0.68)";
        }
        ctx.moveTo(125, 35);
        ctx.arc(xCanvas, yCanvas, 6, 0, 2 * Math.PI);
        ctx.fill();
    }
}