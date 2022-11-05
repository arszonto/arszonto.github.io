window.onresize = function () {
    canvas.style.width = '100%';
    canvas.height = canvas.width * .75;
}

function setupGameArea() {
    fillCanvas();
}

function drawRectangle(ctx, color, size, position) {
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, size.x, size.y);
}

function fillCanvas() {
    const canvas = document.getElementById("platform-canvas");
    const context = canvas.getContext("2d");
    drawRectangle(context, "yellowgreen", {x: canvas.width, y: canvas.height}, {x: 0, y: 0});
}

function generateRectangleInButtonArea() {
    const canvas = document.getElementById("platform-canvas");
    const context = canvas.getContext('2d');
    const size = {x: canvas.width * 0.2, y: canvas.width * 0.2}
    const position = {x: canvas.width / 2, y: canvas.height / 2}
    drawRectangle(context, getRandomColor(), size, position);
}
