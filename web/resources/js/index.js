window.onload = function(){
    update();
}
function update(){
    let now = new Date();
    let clock = [now.getHours(), now.getMinutes(),now.getSeconds() ].join(":");
    let date = [now.getDay(), now.getMonth()+1, now.getFullYear()].join(".");
    let clockElem = document.getElementById("clock");
    clockElem.innerText = [clock,date].join("|");
    setInterval(update, 5000);
}