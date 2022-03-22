import { TAU } from './math.js';
import { Complex } from './complex.js';
import { FourierCoefs } from './fourier.js';
import { SVG } from './svg_api.js';

class FourierSketch {
  constructor(dataSrc, div, nb_coefs=null, period=1, skip=1) {
    this.canvas = new SVG(div);
    this.path = this.canvas.createElement("polyline", {id:"path"});
    this.vectors = this.canvas.createElement("g", {id:"vectors"});
    this.epicycles = this.canvas.createElement("g", {id:"epicycles"});
    this.cycle = [];
    this.vector = [];

    this.preprocess(dataSrc, skip);
    this.length = this._f.length;
    if (!nb_coefs) nb_coefs = this.length;
    this.coefs = FourierCoefs(this._f, nb_coefs);
    this.coefs.sort((a, b) => b.r - a.r);

    this.initDrawing();
    this.nbCoefs = Math.floor(this.coefs.length);

    this.current_frame = 0;
    this.time_interval = 1000 * period / this.length;
  }

  set nbCoefs(nb) {
    this.nb_coefs = (nb > this.coefs.length) ? this.coefs.length:nb;
    let N = Math.floor(nb / 2);
    this.index = this.generate_index(-N, this.nb_coefs - N);
    this.partialSeries();
  }

  generate_index(start, stop) {
    let index = new Array();
    for (let n = 0; n < this.coefs.length; n++) {
      if (this.coefs[n].index >= start && this.coefs[n].index < stop) {
        index.push(n);
        this.cycle[n].setAttribute("visibility", "visible");
        this.vector[n].setAttribute("visibility", "visible");
      } else {
        this.cycle[n].setAttribute("visibility",  "hidden");
        this.vector[n].setAttribute("visibility", "hidden");
      }
    }
    return index;
  }

  preprocess(data, skip) {
    this._f = [];
    let xlim = {min: Infinity, max: -Infinity};
    let ylim = {min: Infinity, max: -Infinity};
    for (let i = 0; i < data.length; i+=skip) {
      const x = data[i].x;
      const y = data[i].y;
      const c = new Complex(x, y);
      this._f.push(c);
      xlim.min = (x < xlim.min) ? x : xlim.min;
      xlim.max = (x > xlim.max) ? x : xlim.max;
      ylim.min = (y < ylim.min) ? y : ylim.min;
      ylim.max = (y > ylim.max) ? y : ylim.max;
    }
    let dim = {width: xlim.max - xlim.min, height: ylim.max - ylim.min};
    let center = {x: (xlim.min + xlim.max) / 2, y: (ylim.min + ylim.max) / 2};
    for (let i = 0; i < this._f.length; i++) {
      this._f[i].re -= center.x;
      this._f[i].im -= center.y;
    }
    let margin = (dim.width + dim.height) / 4;
    let viewBox = [
      -dim.width/2 - margin, -dim.height/2 - margin,
      dim.width+2*margin, dim.height+2*margin
    ];
    this.canvas.width  = "100%";//dim.width;
    this.canvas.height = "100%";//dim.height;
    this.canvas.viewBox = viewBox.join(' ');
  }

  partialSeries() {
    // partial[k][n] = cumulative sum of the first n coefs at instant t[k]
    this.partial = new Array(this.length);
    for (let k = 0; k < this.length; k++) {
      let x = 0, y = 0;
      this.partial[k] = new Array(this.nb_coefs);
      for (let n = 0; n < this.nb_coefs; n++) {
        let coef = copy(this.coefs[this.index[n]]);
        let phase = coef.arg + coef.index * TAU * k / this.length;
        x += coef.r * Math.cos(phase);
        y += coef.r * Math.sin(phase);
        this.partial[k][n] = copy({x: x, y: y});
      }
    }
  }

  initDrawing() {
    this.epicycles.setAttribute("fill", "none");
    this.epicycles.setAttribute("stroke", "black");
    this.epicycles.setAttribute("stroke-width", ".3");
    this.vectors.setAttribute("fill", "none");
    this.vectors.setAttribute("stroke", "grey");
    this.vectors.setAttribute("stroke-width", ".3");
    this.path.setAttribute("fill", "none");
    this.path.setAttribute("stroke", "black");
    for (let n = 0; n < this.coefs.length; n++) {
      this.cycle.push(this.epicycles.createElement("circle", {id: this.coefs.index}));
      this.vector.push(this.vectors.createElement("line"));
    }
  }

  drawFrame(k) {
    let prev = {x: 0, y: 0};
    this.index.forEach(n => {
      // draw cycle
      this.cycle[n].center = copy(prev);
      this.cycle[n].radius = this.coefs[n].r;

      // draw vector
      this.vector[n].start = copy(prev);
      this.vector[n].end   = copy(this.partial[k][n]);

      prev = copy(this.partial[k][n]);
    });
    if (this.path.length >= this.length) this.path.pop();
    this.path.push(prev);
  }

  animate() {
    this._play = true;
    setInterval(() => {
      if (this._play) {
        this.drawFrame(this.current_frame++);
        if (this.current_frame >= this.length) this.current_frame = 0;
      }
    }, this.time_interval);
    this.canvas.parent.addEventListener("click", (e) => {
      this._play = !this._play;
    });
  }

  play() {this._play = true;}
  pause() {this._play = false;}

  controlSlider(id) {
    var slider = document.getElementById(id);
    slider.setAttribute("max", this.coefs.length);
    slider.setAttribute("value", this.nb_coefs);
    slider.addEventListener("change", (e) => {
      this.nbCoefs = e.target.value;
    });
  }
}

function copy(obj) {
  return Object.assign({}, obj);
}

export { FourierSketch };