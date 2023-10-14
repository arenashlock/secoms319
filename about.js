let pokeballImage = document.getElementById("pokeball");
let rotatedDegrees = 0;

setInterval(function(){
    rotatedDegrees = (rotatedDegrees + 5) % 360;
    pokeballImage.style.transform = "rotate(" + rotatedDegrees + "deg)";
}, 100);