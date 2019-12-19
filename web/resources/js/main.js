window.onload = function () {
    createGraphic(1);
}
var count =0;
function createGraphic(r) {
    let canvas = document.getElementById("graph"), context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    //rectangle
    context.beginPath();
    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    context.fillRect(200, 200, 28*r, 57*r);
    context.moveTo(200,200);
    context.stroke();

    //sector
    context.arc(200, 200, 57*r, Math.PI, Math.PI*3/2, false);
    context.lineTo(200, 200);
    context.lineTo(200-57*r,200);
    context.fill();
    context.moveTo(200-28.5*r,200);
    context.stroke();

    //triangle
    context.lineTo(200,200+57*r);
    context.lineTo(200,200);
    context.lineTo(200-28.5*r,200);
    context.fill();
    context.stroke();
    context.closePath();

    // axes
    context.beginPath();
    context.font = "10px Verdana";
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.moveTo(200, 29);
    context.lineTo(200, 371);
    context.moveTo(200, 29);
    context.lineTo(195, 44);
    context.moveTo(200, 29);
    context.lineTo(205, 44);
    context.fillText("Y", 210, 39);
    context.moveTo(29, 200);
    context.lineTo(371, 200);
    context.lineTo(356, 195);
    context.moveTo(371, 200);
    context.lineTo(356, 205);
    context.fillText("X", 361, 180);
    context.stroke();

    context.closePath();
    drawTablePoints();
}
function clickCanvas(event) {
    let r = document.getElementById("inputs:R_field_input").value;
    let br = document.getElementById("graph").getBoundingClientRect();
    let cornerX = br.x;
    let cornerY = br.y;
    let xPX= event.x-cornerX-200;
    let yPX = (event.y-cornerY-200);

    let x = xPX/57;
    let y = -1*yPX/57;
    console.log(x+" " + y);
    document.getElementById('canvasInputs:xCanvas').value=x;
    document.getElementById('canvasInputs:yCanvas').value=y;
    addPoint();
    drawPoint(xPX+200, yPX+200, hitting(x,y,r));
}
function hitting(x,y,r){
    let circle = (x<=0 && y>=0) && r>=Math.sqrt(x*x+y*y);
    let triangle = (x<=0 && y<=0) && x*(-2)-r<=y;
    let rectangle = (x>=0 && y<=0) && (x<=r/2 && y>=(-1)*r );

    return circle || triangle || rectangle;
}
function drawPoint(x,y,hit){
    let context = document.getElementById('graph').getContext('2d');
    context.beginPath();
    context.arc(x,y,5,0,2*Math.PI);
    context.fillStyle = hit ? 'green' : 'red';
    context.fill();
    context.closePath();
}
function drawTablePoints(){
    let cur_r = document.getElementById("inputs:R_field_input").value;
    let table = document.getElementById("table_data");
    let points = table.children;
   if(table.className.search("ui-datatable-empty-message")<0){
        for (let i = 0; i < points.length; i++) {
            console.dir(points[i]);
            let x = points[i].children[0].innerText;
            let y = points[i].children[1].innerText;
            let r = points[i].children[2].innerText;
            let hit = points[i].children[3].innerText;
            if (r != cur_r) {
                drawPointFromTable(x, y, 'yellow');
            } else {
                drawPointFromTable(x, y, hit ? 'green' : 'red');
            }
        }
    }
}
function drawPointFromTable(x,y,colour) {
    let xPx = x*57+200;
    let yPx = -1*y*57+200;
    console.log(xPx+" "+yPx);
    let context = document.getElementById('graph').getContext('2d');
    context.beginPath();
    context.arc(xPx,yPx,5,0,2*Math.PI);
    context.fillStyle = colour;
    context.fill();
    context.closePath();
}