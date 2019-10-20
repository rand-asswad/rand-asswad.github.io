class PieChart {
    constructor(div, diameter, data, colors) {
        this._parent = div;
        this._svg = new SVG(div, diameter, diameter);
        this._data = data;
        this._colors = colors;
        this._center = {x: this._svg.width / 2, y:this._svg.height / 2};
        this._paths = [];
        this._radius = diameter * .4;
    }

    set data(array) {this._data = array;}
    set colors(array) {this._colors = array;}

    get parent() {return this._parent};
    get data() {return this._data;}
    get colors() {return this._colors;}
    get chart() {return this._svg;}
    get svg() {return this._svg.node;}
    get length() {return this._data.length;}
    get paths() {return this._paths;}
    get total() {
        let s = 0;
        for (let i = 0; i < this.length; i++) s += this._data[i];
        return s;
    }

    draw(stroke, interval=0.1) {
        let start = -HALF_PI;
        let end;
        let round = TAU / this.total;
        if (stroke === undefined) stroke = {width: 10};
        else if (stroke.width === undefined) stroke.width = 10;
        for (let i = 0; i < this.length; i++) {
            end = start + this.data[i] * round - interval;
            var path = this.chart.path(describeArc(this._center, this._radius, start, end));
            path.class = 'drawpath';
            path.fill = 'none';
            stroke.color = this.colors[i];
            path.stroke = stroke;
            path.animate();
            this.paths.push(path);
            start = end + interval;
        }
    }
}
