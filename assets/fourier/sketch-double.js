let x = [];
let y = [];
let coefsX;
let coefsY;
let time = 0;
let period = 20;
let path = [];
let centroid;
let scale = .4;

let data;
function preload() {
    data = loadStrings('/assets/fourier/fourier_outline.txt');
}

function parseData(data) {
    let i;
    let x_avg = 0;
    let y_avg = 0;
    for (i = 0; i < data.length; i++) {
        const s = data[i].split(',');
        const px = parseFloat(s[0] * scale);
        const py = parseFloat(s[1] * scale);
        const cx = new Complex(px, 0);
        const cy = new Complex(0, py);
        x_avg += px;
        y_avg += py;
        x.push(cx);
        y.push(cy);
    }
    x_avg /= data.length;
    y_avg /= data.length;
    for (i = 0; i < data.length; i++) {
        x[i].re -= x_avg;
        y[i].im -= y_avg;
    }
    centroid = new Complex(x_avg, y_avg);
}

function setup() {
    parseData(data);
    createCanvas(1000, 1000).parent('sketch-holder');
    let fps = Math.round(x.length / period);
    frameRate(fps);
    coefsX = FourierCoefs(x, x.length/4, false);
    coefsY = FourierCoefs(y, y.length/4, false);
    coefsX.sort((a, b) => b.r - a.r);
    coefsY.sort((a, b) => b.r - a.r);
}

function epiCycles(x, y, coefs) {
    for (let n = 0; n < coefs.length; n++) {
        let prev_x = x;
        let prev_y = y;
        let base_phase = coefs[n].index * TAU * time / period;
        x += coefs[n].r * cos(coefs[n].arg + base_phase);
        y += coefs[n].r * sin(coefs[n].arg + base_phase);

        stroke(255, 100);
        noFill();
        circle(prev_x, prev_y, coefs[n].r);

        stroke(255);
        line(prev_x, prev_y, x, y);
    }
    return createVector(x, y);
}

function draw() {
    background(0);
    ellipseMode(RADIUS);
    xCycles = {x: width * .7, y: height * .3};
    yCycles = {x: width * .3, y: height * .7};
    
    let vx = epiCycles(xCycles.x, xCycles.y, coefsX);
    let vy = epiCycles(yCycles.x, yCycles.y, coefsY);
    path.push(createVector(vx.x, vy.y));

    stroke(255, 50);
    line(vx.x, vx.y, vx.x, vy.y);
    line(vy.x, vy.y, vx.x, vy.y);

    beginShape();
    stroke(255);
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = period / x.length;
    time += dt;

    if (time >= period) {
        time = 0;
        path = [];
    }
}