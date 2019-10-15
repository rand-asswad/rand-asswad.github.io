let f = [];
let coefs;
let time = 0;
let period = 20;
let path = [];
let centroid;

let data;
function preload() {
    data = loadStrings('/assets/fourier/fourier_outline.txt');
}

function setup() {
    var canvas = createCanvas(800, 800);
    canvas.parent('sketch-holder');
    const skip = 8;
    /*
    for (let i = 0; i < drawing.length; i += skip) {
        z = new Complex(drawing[i].x, drawing[i].y);
        f.push(z);
    }*/
    for (let i = 0; i < data.length; i++) {
        const s = data[i].split(',');
        const px = parseFloat(s[0] / 2);
        const py = parseFloat(s[1] / 2);
        const c = new Complex(px, py);
        f.push(c);
    }
    let fps = Math.round(f.length / period);
    frameRate(fps);
    coefs = FourierCoefs(f, f.length);
    centroid = new Complex(coefs[0].re, coefs[0].im);
    coefs.sort((a, b) => b.r - a.r);
}

function epiCycles() {
    let x = 0;
    let y = 0;
    for (let n = 0; n < coefs.length; n++) {
        let prev_x = x;
        let prev_y = y;
        let base_phase = coefs[n].index * TAU * time / period;
        x += coefs[n].r * cos(coefs[n].arg + base_phase);
        y += coefs[n].r * sin(coefs[n].arg + base_phase);

        if (n > 0) {
            stroke(255, 100);
            noFill();
            circle(prev_x, prev_y, coefs[n].r);

            stroke(255);
            line(prev_x, prev_y, x, y);
        }
    }
    return createVector(x, y);
}

function draw() {
    background(0);
    ellipseMode(RADIUS);
    translate(width / 2 - centroid.re, height / 2 - centroid.im);

    let v = epiCycles();
    path.push(v);

    beginShape();
    noFill();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].x, path[i].y);
    }
    endShape();

    const dt = period / f.length;
    time += dt;

    if (time >= period) {
        time = 0;
        path = [];
    }
}