const ca = document.getElementById("canvas");
const g = ca.getContext("2d");
let funcs =[];
funcs[0]=function(){
  console.log("succes");
}

window.onload = function(){
  setInterval(function(){timer()},50);
}

function timer(){
console.log("aaaa");
funcs[0]();
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
