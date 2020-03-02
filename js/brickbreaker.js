const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let counter = document.getElementById("wins")
let speed;
ctx.strokeStyle = "blue";
let sc;
let start = false;
let blocks = [];
let nw = 0;
let user = {
    x: (canvas.width / 2) - 40,
    y: canvas.height - 10,
    width: 80,
    height: 5,
    movement: 20
};

let bouncer = {
    x: undefined,
    y: undefined,
    radius: 10,
    right: true,
    up: true
};
