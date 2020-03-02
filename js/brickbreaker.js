const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let counter = document.getElementById("wins")
let speed;
ctx.strokeStyle = "black";
let speedc;
let start = false;
let blocks = [];
let wins = 0;
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
    bouncer.x = canvas.width / 2;
    bouncer.y = canvas.height - 20;
    bouncer.right = true;
    bouncer.up = true;
    user.x = (canvas.width / 2) - 40;
    user.y = canvas.height - 10;
    speedc = 1;
    speed = 0;
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
        speed = 3 * speedc;
    }
    else {
        speed = -3 * speedc;
    }
    if (bouncer.up) {
        dy = -3;
    }
    else {
        dy = 3;
    }
    bouncer.x += speed;
    bouncer.y += dy;
}

function checkCollision() {
    if (bouncer.x - bouncer.radius <= 0) {
        bouncer.right = true;
    }
    if (bouncer.x + bouncer.radius >= canvas.width) {
        bouncer.right = false;
    }
    if (bouncer.y - bouncer.radius <= 0) {
        bouncer.up = false;
    }
    if (bouncer.y - bouncer.radius >= canvas.height) {
        lose();
    }

    for (let j = 0; j < blocks.length; j++) {
        if (bouncer.y - bouncer.radius <= blocks[j].y + blocks[j].height && bouncer.y - bouncer.radius > blocks[j].y + blocks[j].height - 5 && bouncer.x >= blocks[j].x - bouncer.radius && bouncer.x < blocks[j].x + blocks[j].width + bouncer.radius) {
            bouncer.up = false;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
        else if (!bouncer.up && bouncer.y + bouncer.radius >= blocks[j].y && bouncer.y + bouncer.radius < blocks[j].y + 12 && bouncer.x >= blocks[j].x - bouncer.radius && bouncer.x < blocks[j].x + blocks[j].width + bouncer.radius) {
          bouncer.up = true;
          ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
          blocks.splice(j, 1);
          break;
        }
        else if (bouncer.x + bouncer.radius >= blocks[j].x && bouncer.x + bouncer.radius < blocks[j].x + 10 && bouncer.y >= blocks[j].y - bouncer.radius && bouncer.y < blocks[j].y + blocks[j].height + bouncer.radius) {
            bouncer.right = false;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
        else if (bouncer.x - bouncer.radius <= blocks[j].x + blocks[j].width && bouncer.x - bouncer.radius > blocks[j].x + blocks[j].width - 10 && bouncer.y >= blocks[j].y - bouncer.radius && bouncer.y < blocks[j].y + blocks[j].height + bouncer.radius) {
            bouncer.right = true;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
    }

    if (bouncer.y + bouncer.radius == user.y) {
        let a = 3;
        const speedcc = a / 25;
        for (let i = 2; i <= 100; i += 2) {
            if (bouncer.x >= user.x - bouncer.radius + i - 2 && bouncer.x < user.x - bouncer.radius + i) {
                if (i < 50) {
                    bouncer.up = true;
                    bouncer.right = false;
                    speed = (speed >= 11) ? speed = 11 : speed + 0.3;
                    speedc = Math.abs(a);
                }
                else if (i >= 50) {
                    bouncer.up = true;
                    bouncer.right = true;
                    speed = (speed >= 11) ? speed = 11 : speed + 0.3;
                    speedc = Math.abs(a);
                }
                break;
            }
            else {
                a -= speedcc;
            }
        }
    }

    if (user.x + user.width > canvas.width) {
        user.movement = 0;
        user.x = canvas.width - user.width;
    }
    else if (user.x < 0) {
        user.movement = 0;
        user.x = 0;
    }
    else {
        user.movement = 20;
    }
}

function draw() {
    ctx.strokeRect(user.x, user.y, user.width, user.height);
    ctx.beginPath();
    ctx.arc(bouncer.x, bouncer.y, bouncer.radius, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < blocks.length; i++) {
        ctx.strokeRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);
    }
}

function getArrowKeys(event) {
    if (start) {
        if (event.keyCode == 37) {
            moveuser(-1 * user.movement);
        }
        else if (event.keyCode == 39) {
            moveuser(user.movement);
        }
    }
}

function moveuser(pixels) {
    user.x += pixels;
}

function createblocks() {
    for (let y = 0; y <= 80; y += 40) {
        for (let x = 0; x < canvas.width; x += canvas.width / 10) {
            let bottleT = {
                x: x,
                y: y,
                width: canvas.width / 10,
                height: 40
            };
            blocks.push(bottleT);
        }
    }
}

function lose() {
    init();
}

function win() {
  start = false;
  wins += 1
  counter.innerHTML = wins
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 2.5;
  ctx.textAlign = "center";
  ctx.font = "60px Arial";
  ctx.fillText("You Win!", canvas.width/2, (canvas.height/2) - 40);
}
