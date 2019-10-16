let f = [];
let coefs;
let time = 0;
let period = 20;
let path = [];
let centroid;
let curvePos;
let scale = 4;

function parseData() {
    let i;
    let x_avg = 0;
    let y_avg = 0;
    for (i = 0; i < drawing.length; i++) {
        const px = drawing[i].x * scale;
        const py = drawing[i].y * scale;
        const c = new Complex(px, py);
        f.push(c);
        x_avg += px;
        y_avg += py;
    }
    x_avg /= drawing.length;
    y_avg /= drawing.length;
    for (i = 0; i < drawing.length; i++) {
        f[i].re -= x_avg;
        f[i].im -= y_avg;
    }
    centroid = new Complex(x_avg, y_avg);
}

function setup() {
    parseData();
    createCanvas(1200, 1000).parent('sketch-holder');
    let fps = Math.round(f.length / period);
    frameRate(fps);
    coefs = FourierCoefs(f, f.length);
    coefs.sort((a, b) => b.r - a.r);
}

function epiCycles() {
    let x = curvePos.x;
    let y = curvePos.y;
    for (let n = 0; n < coefs.length; n++) {
        let prev_x = x;
        let prev_y = y;
        let base_phase = coefs[n].index * TAU * time / period;
        x += coefs[n].r * cos(coefs[n].arg + base_phase);
        y += coefs[n].r * sin(coefs[n].arg + base_phase);

        stroke(255, 50);
        noFill();
        circle(prev_x, prev_y, coefs[n].r);

        stroke(255, 100);
        line(prev_x, prev_y, x, y);
    }
    return createVector(x, y);
}

function draw() {
    background(0);
    ellipseMode(RADIUS);
    curvePos = {x: width / 2, y: height / 2};

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
        //path = [];
    }
}