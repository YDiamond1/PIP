const correctX = [-5, -4, -3, -2, -1, 0, 1, 2, 3];



function set(znch,elem) {
    var coordinat = document.getElementById(elem);
    if(coordinat.hasAttribute('value')){
        coordinat.setAttribute('value',znch);
    }
}
/*
function checkparametrs(value) {
    if()

}*/

function checkY(value){
    if(value!='-') {
        if (value.indexOf(',') >= 0) {
            value = value.replace(',' , '.');
        }
        if (!isNaN(Number(value))) {

            if (value < -3 || value > 5) {
                yV.style.backgroundColor="red";
            }
            else{
                if(value!="") {
                    yV.style.backgroundColor = "#10FF58";
                }else{
                    yV.style.backgroundColor="";
                }
            }
        } else {
            yV.style.backgroundColor='red';
        }
    }

}
function checkYform(value){
    value = value.replace(',','.');
    if(!isNaN(Number(value))){
        if(value >= -3 || value <= 5){
            return true;
        }
    }
    return false;
}
function checkRform(value){
    value = value.replace(',','.');
    if(!isNaN(Number(value))){
        if(value >= 1 || value <= 4){
            return true;
        }
    }
    return false;
}
function checkX() {
    let havevalue = false;
    let inputs = document.getElementsByTagName("input");
    let mas = [];
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'checkbox') {
            mas.push(inputs[i]);
        }
    }

    for (i = 0; i < mas.length; i++) {
        console.dir(mas[i]);
        if (mas[i].checked) {
            havevalue = true;

            if (!correctX.includes(Number(mas[i].value))) {

                return false;
            }
        }
    }
    return havevalue;
}
function submitForm(){

    return checkRform(rV.value) && checkYform(yV.value) && checkX();
}






/*var isWasR =false;
function isdigitsR(put){
    var ch = put.value.charAt(put.value.length-1);
    if(!(ch== "." || ch=="," || isFinite(ch))
        || ((ch== "." || ch==",")&&(put.value.length==1))
        || ((ch== "." || ch==",") && isWasR )){
        put.value = put.value.slice(0,put.value.length-1);
    }
    if(!isWasR && (ch== "." || ch==",")){
        isWasR=true;
    }
    if(put.value.indexOf(',')<0 && put.value.indexOf('.')<0){ isWasR=false;}
}*/
function checkR(value) {
    if(value.indexOf(',')>=0){
        value= value.replace(',','.');
    }
    if(!isNaN(Number(value))){

        if(value<1 || value>4){
            if(value!="") {
                rV.style.backgroundColor = 'red';
            }else{
                rV.style.backgroundColor = "white";
            }
        }
        else {
                rV.style.backgroundColor = '#10FF58';
        }
    }else{
        rV.style.backgroundColor = 'red';
    }
}