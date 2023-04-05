class MOUSE {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

}


let ctx = document.querySelector("canvas");
let c = ctx.getContext("2d");

ctx.width = innerWidth
ctx.height = innerHeight


let h = ctx.height,
    w = ctx.width;

let MAX_OBJECTS = 1e8 + 5;

let m = new MOUSE();

class sqr {
    constructor(x, y, w, h, dx = 0, dy = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "green"
            //
        this.dx = dx;
        this.dy = dy;
    }
    drow() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    }


    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.w >= w || this.x <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.h >= h || this.y <= 0) {
            this.dy = -this.dy;
        }
        this.drow();

    }
}

class Edge {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
    drow() {
        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.stroke();
    }
}


class Circle {
    constructor(x, y, radius, dx, dy, color = "black") {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    drow() {
        c.beginPath();
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.lineWidth = 1;
        c.fill()
        c.stroke();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius >= w || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= h || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.drow();
    }
}

let G = new Array(5000);
let indx = 0;


function drwl(p1, p2) {
    c.beginPath();
    c.moveTo(p1.x, p1.y);
    c.lineTo(p2.x, p2.y);
    c.stroke();
}

function animation() {
    c.clearRect(0, 0, w, h);


    for (let i = 0; i < indx; ++i) {
        G[i][0].update();
        for (let j = 1; j < G[i].length; ++j) {
            drwl(G[i][0], G[i][j]);
        }
    }



    requestAnimationFrame(animation);
}
requestAnimationFrame(animation);


function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(
        Math.pow(xDist, 2) + Math.pow(yDist, 2)
    );
}


document.addEventListener("click", (event) => {
    // let dx = (Math.random() * 10) - 5;
    // let dy = (Math.random() * 15) - 5;
    let newc = new Circle(event.x, event.y, 10, 0, 0);
    G[indx++] = [newc];
    let e = 0,
        dis = 1e9;

    for (let i = 0; i < indx; i++) {
        if (i == indx - 1) continue;
        let d = distance(G[i][0].x, G[i][0].y, event.x, event.y);
        if (d < dis) {
            dis = d;
            e = i;
        }
    }
    G[e][0].color = 'red';
    G[e].push(newc);


});
/*
document.addEventListener('keypress', (event) => {
    if (event.ctrlKey) {
        console.log("sdas")
    }
    console.log(event.code)
});
*/


/*
if (event.ctrlKey) {
  alert("The CTRL key was pressed!");
} else {
  alert("The CTRL key was NOT pressed!");
}...

*/