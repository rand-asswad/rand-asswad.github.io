function sketchFourier(fileName, div, scale=1, period=1, mode='single') {
    if (mode == 'single') return sketchSingle(fileName, div, scale, period);
    if (mode == 'double') return sketchDouble(fileName, div, scale, period);
    return undefined;
}

function sketchSingle(fileName, div, scale, period) {
    let data;
    let f = [];
    let coefs;
    let path = [];
    let dt;

    var sketch = function(p) {
        p.disableFriendlyErrors = true;

        p.bgColor = 0;
        p.pathColor = 255;
        p.cyclesColor = "#555";
        p.vectorsColor = "#999";

        p.period = period;
        let dim;

        p.preload = function() {
            data = p.loadStrings(fileName);
        }

        var parseData = function() {
            let xlim = {min: Infinity, max: -Infinity};
            let ylim = {min: Infinity, max: -Infinity};
            for (let i = 0; i < data.length; i++) {
                const s = data[i].split(',');
                const x = parseFloat(s[0]) * scale;
                const y = parseFloat(s[1]) * scale;
                const c = new Complex(x, y);
                f.push(c);
                xlim.min = (x < xlim.min) ? x : xlim.min;
                xlim.max = (x > xlim.max) ? x : xlim.max;
                ylim.min = (y < ylim.min) ? y : ylim.min;
                ylim.max = (y > ylim.max) ? y : ylim.max;
            }
            dim = {width: xlim.max - xlim.min, height: ylim.max - ylim.min};
            let center = {x: (xlim.min + xlim.max) / 2, y: (ylim.min + ylim.max) / 2};
            for (let i = 0; i < data.length; i++) {
                f[i].re -= center.x;
                f[i].im -= center.y;
            }
        }

        p.setup = function() {
            parseData();
            p.createCanvas(dim.width * 1.5, dim.height * 1.5);
            p.frameRate(Math.round(f.length / period));
            coefs = FourierCoefs(f, f.length);
            coefs.sort((a, b) => b.r - a.r);
            dt = period / f.length;
            p.time = 0;
        }

        p.draw = function() {
            p.background(p.bgColor);
            p.ellipseMode(p.RADIUS);
            let initial_pos = {x: p.width / 2, y: p.height / 2};
            path.push(epiCycles(p, initial_pos, coefs));

            p.beginShape();
            p.noFill();
            p.stroke(p.pathColor);
            for (let i = 0; i < path.length; i++)
                p.vertex(path[i].x, path[i].y);
            p.endShape();

            p.time += dt;
            if (p.time >= period) time = 0;
        }

        p.start = function() {
            p.time = 0;
            path = [];
            p.loop();
        }
    }

    return new p5(sketch, div);
}

function sketchDouble(fileName, div, scale, period) {
    let data;
    let x = [];
    let y = [];
    let coefsX;
    let coefsY;
    let path = [];
    let dt;

    var sketch = function(p) {
        p.bgColor = 0;
        p.pathColor = 255;
        p.cyclesColor = "#555";
        p.vectorsColor = "#999";
        p.coordColor = "#777";

        p.period = period;
        let dim;
        
        p.preload = function() {
            data = p.loadStrings(fileName);
        }

        var parseData = function() {
            let xlim = {min: Infinity, max: -Infinity};
            let ylim = {min: Infinity, max: -Infinity};
            for (let i = 0; i < data.length; i++) {
                const s = data[i].split(',');
                const px = parseFloat(s[0]) * scale;
                const py = parseFloat(s[1]) * scale;
                const cx = new Complex(px, 0);
                const cy = new Complex(0, py);
                x.push(cx);
                y.push(cy);
                xlim.min = (px < xlim.min) ? px : xlim.min;
                xlim.max = (px > xlim.max) ? px : xlim.max;
                ylim.min = (py < ylim.min) ? py : ylim.min;
                ylim.max = (py > ylim.max) ? py : ylim.max;
            }
            dim = {width: xlim.max - xlim.min, height: ylim.max - ylim.min};
            let center = {x: (xlim.min + xlim.max) / 2, y: (ylim.min + ylim.max) / 2};
            for (let i = 0; i < data.length; i++) {
                x[i].re -= center.x;
                y[i].im -= center.y;
            }
        }

        p.setup = function() {
            parseData();
            p.createCanvas(dim.width * 3, dim.height * 3);
            p.frameRate(Math.round(data.length / period));
            coefsX = FourierCoefs(x, x.length/2, false);
            coefsY = FourierCoefs(y, y.length/2, false);
            coefsX.sort((a, b) => b.r - a.r);
            coefsY.sort((a, b) => b.r - a.r);
            dt = period / x.length;
            p.time = 0;
        }

        p.draw = function() {
            p.background(p.bgColor);
            p.ellipseMode(p.RADIUS);
            x_pos = {x: p.width * .7, y: p.height * .3};
            y_pos = {x: p.width * .3, y: p.height * .7};
            let vx = epiCycles(p, x_pos, coefsX);
            let vy = epiCycles(p, y_pos, coefsY);
            path.push(p.createVector(vx.x, vy.y));
    
            p.stroke(p.color(p.coordColor));
            p.line(vx.x, vx.y, vx.x, vy.y);
            p.line(vy.x, vy.y, vx.x, vy.y);

            p.beginShape();
            p.noFill();
            p.stroke(p.pathColor);
            for (let i = 0; i < path.length; i++)
                p.vertex(path[i].x, path[i].y);
            p.endShape();

            p.time += dt;
            if (p.time >= period) time = 0;
        }
    }

    return new p5(sketch, div);
}

function epiCycles(p, fig_pos, coefs) {
    let x = fig_pos.x;
    let y = fig_pos.y;
    for (let n = 0; n < coefs.length; n++) {
        let prev_x = x;
        let prev_y = y;
        let phase = coefs[n].arg + coefs[n].index * TAU * p.time / p.period;
        x += coefs[n].r * Math.cos(phase);
        y += coefs[n].r * Math.sin(phase);

        p.stroke(p.color(p.cyclesColor));
        p.noFill();
        p.circle(prev_x, prev_y, coefs[n].r);

        p.stroke(p.color(p.vectorsColor));
        p.line(prev_x, prev_y, x, y);
    }
    return p.createVector(x, y);
}
