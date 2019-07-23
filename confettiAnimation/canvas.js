var canvas = document.getElementById("confetti");
canvas.width = 640;
canvas.height = 480;

var context = canvas.getContext('2d');
var pieces = [];
var numberOfPieces = 50;
var lastUpdateTime = Date.now()

function randomColor() {
    var colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random() * colors.length)]; 
}


function update() {
    var now = Date.now()
    dt = now - lastUpdateTime;
    for(var i = pieces.length -1; i >= 0 ;i --) {
        var p = pieces[i];
        if(p.y > canvas.height) {
            pieces.splice(i , 1);
            continue;
        }
        p.y += p.gravity * dt;
        p.rotation += p.rotationSpeed * dt;
    }
    while(pieces.length < numberOfPieces) {
        pieces.push(new Piece(Math.random() * canvas.width, -20));
    }
    lastUpdateTime = now;

    setTimeout(update, 1);

};

function draw () {
    context.clearRect(0,0, canvas.width, canvas.height);
    pieces.forEach(function(p) {
        context.save();
        context.fillStyle = p.color;
        context.translate(p.x + p.size/2, p.y + p.size/2);
        context.rotate(p.rotation);

        context.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        
        context.restore();

    });
    requestAnimationFrame(draw);
};

function Piece (x,y) {
    this.x = x;
    this.y = y;
    this.size = (Math.random() * 0.5 + 0.75 ) * 15;
    this.gravity = (Math.random() * 0.5 + 8.75) * 0.01;
    this.rotation = (Math.PI * 2) * Math.random();
    this.rotationSpeed = (Math.PI * 2) * Math.random() * 0.001;
    this.color = randomColor();
}

while(pieces.length < numberOfPieces) {
    pieces.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
}


update();
draw();