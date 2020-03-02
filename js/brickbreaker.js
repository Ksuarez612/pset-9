const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let counter = document.getElementById("wins")
let s;
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

window.onload = function() {
    document.getElementById("reset-button").onclick = init;
    document.getElementById("game").onclick = init;
    game();
}
document.addEventListener("keydown", getArrowKeys);
function init() {
    boinker.x = canvas.width / 2;
    boinker.y = canvas.height - 20;
    boinker.right = true;
    boinker.up = true;
    user.x = (canvas.width / 2) - 40;
    user.y = canvas.height - 10;
    sc = 1;
    s = 0;
    blocks = [];
    createblocks();
    start = true;
}

function game() {
    if (start) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        checkCollision();
        changeDirection();
        if (blocks.length === 0) {
            win();
        }
    }
    setTimeout(game, 20 - speed);
}

function changeDirection() {
    if (bouncer.right) {
        s = 3 * sc;
    }
    else {
        s = -3 * sc;
    }
    if (bouncer.up) {
        dy = -3;
    }
    else {
        dy = 3;
    }
    bouncer.x += s;
    bouncer.y += dy;
}
