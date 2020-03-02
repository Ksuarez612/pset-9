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
    } else {
        s = -3 * sc;
    }
    if (bouncer.up) {
        dy = -3;
    } else {
        dy = 3;
    }
    bouncer.x += s;
    bouncer.y += dy;
}

function checkCollision() {
    if (bouncer.x - bouncer.radius <= 0) {
        bouncer.right = true;
    }
    if (bouncer.x + bouncer.radius >= canvas.width) {
        boinker.right = false;
    }
    if (bouncer.y - bouncer.radius <= 0) {
        boinker.up = false;
    }
    if (bouncer.y - bouncer.radius >= canvas.height) {
        lose();
    }

    for (let j = 0; j < blocks.length; j++) {
        if (bouncer.y - bouncer.radius <= blocks[j].y + blocks[j].height && bouncer.y - bouncer.radius > blocks[j].y + blocks[j].height - 5 && bouncer.x >= blocks[j].x - bouncer.radius && bouncer.x < blocks[j].x + blocks[j].width + bouncer.radius) {
            boinker.up = false;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        } else if (!bouncer.up && bouncer.y + bouncer.radius >= blocks[j].y && bouncer.y + bouncer.radius < blocks[j].y + 12 && bouncer.x >= blocks[j].x - bouncer.radius && bouncer.x < blocks[j].x + blocks[j].width + bouncer.radius) {
            boinker.up = true;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        } else if (bouncer.x + bouncer.radius >= blocks[j].x && bouncer.x + bouncer.radius < blocks[j].x + 10 && bouncer.y >= blocks[j].y - bouncer.radius && bouncer.y < blocks[j].y + blocks[j].height + bouncer.radius) {
            boinker.right = false;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        } else if (bouncer.x - bouncer.radius <= blocks[j].x + blocks[j].width && bouncer.x - bouncer.radius > blocks[j].x + blocks[j].width - 10 && bouncer.y >= blocks[j].y - bouncer.radius && bouncer.y < blocks[j].y + blocks[j].height + bouncer.radius) {
            boinker.right = true;
            ctx.clearRect(blocks[j].x, blocks[j].y, blocks[j].width, blocks[j].height);
            blocks.splice(j, 1);
            break;
        }
    }

    if (bouncer.y + bouncer.radius == user.y) {
        let a = 3;
        const sc_change = a / 25;
        for (let i = 2; i <= 100; i += 2) {
            if (bouncer.x >= user.x - bouncer.radius + i - 2 && bouncer.x < user.x - bouncer.radius + i) {
                if (i < 50) {
                    bouncer.up = true;
                    bouncer.right = false;
                    s = (s >= 11) ? s = 11 : s + 0.5;
                    sc = Math.abs(a);
                } else if (i >= 50) {
                    bouncer.up = true;
                    bouncer.right = true;
                    s = (s >= 11) ? s = 11 : s + 0.5;
                    sc_change = Math.abs(a);
                }
                break;
            } else {
                a -= sc_change;
            }
        }
    }

    if (user.x + user.width > canvas.width) {
        user.movement = 0;
        user.x = canvas.width - user.width;
    } else if (user.x < 0) {
        user.movement = 0;
        user.x = 0;
    } else {
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
        } else if (event.keyCode == 39) {
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
            let bTemplate = {
                x: x,
                y: y,
                width: canvas.width / 10,
                height: 40
            };
            blocks.push(bTemplate);
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
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2.5;
    ctx.textAlign = "center";
    ctx.font = "60px Arial";
    ctx.fillText("You Win!", canvas.width / 2, (canvas.height / 2) - 40);
}
