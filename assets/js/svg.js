const ns = 'http://www.w3.org/2000/svg';

class SVG {
    constructor(div, width="100%", height="100%") {
        this._parent = document.getElementById(div);
        this._svg = document.createElementNS(ns, 'svg');
        this._svg.setAttributeNS(null, 'width', width);
        this._svg.setAttributeNS(null, 'height', width);
        this._width = width;
        this._height = height;
        this._parent.appendChild(this._svg);
    }

    addElement(e) {
        this._svg.appendChild(e);
    }

    path(d, id, pClass, stroke, fill) {
        var p = new Path(d, id, pClass, stroke, fill);
        this._svg.appendChild(p.node);
        return p;
    }
    
    get width() {return this._width;}
    get height() {return this._height;}
    get parent() {return this._parent;}
}

class Path {
    constructor(d, id, pClass, stroke, fill) {
        this._p = document.createElementNS(ns, 'path');
        if (d !== undefined) this._p.setAttributeNS(null, 'd', d);
        if (id !== undefined) this._p.setAttributeNS(null, 'id', id);
        if (pClass !== undefined) this._p.setAttributeNS(null, 'class', pClass);
        if (fill !== undefined) this._p.setAttributeNS(null, 'fill', fill);
        if (stroke !== undefined) {
            if (stroke.color !== undefined) this._p.setAttributeNS(null, 'stroke', stroke.color);
            if (stroke.width !== undefined) this._p.setAttributeNS(null, 'stroke-width', stroke.width);
            if (stroke.linecap !== undefined) this._p.setAttributeNS(null, 'stroke-linecap', stroke.linecap);
            if (stroke.dasharray !== undefined) this._p.setAttributeNS(null, 'stroke-dasharray', stroke.dasharray);
        }
        this._d = d;
        this._stroke = stroke;
        this._fill = fill;
        this._id = id;
        this._class = pClass;
    }

    get node() {return this._p;}
    get d() {return this._d;}
    get fill() {return this._fill;}
    get stroke() {return this._stroke;}
    get id() {return this._id;}
    get class() {return this._class;}
    get length() {return this._p.getTotalLength();}
    
    pointAt(d) {return this._p.getPointAtLength(d);}

    set d(str) {
        this._d = str;
        this._p.setAttributeNS(null, 'd', this._d);
    }
    
    set stroke(str) {
        if (str.color !== undefined) this._p.setAttributeNS(null, 'stroke', str.color);
        if (str.width !== undefined) this._p.setAttributeNS(null, 'stroke-width', str.width);
        if (str.linecap !== undefined) this._p.setAttributeNS(null, 'stroke-linecap', str.linecap);
        if (str.dasharray !== undefined) this._p.setAttributeNS(null, 'stroke-dasharray', str.dasharray);
        if (str.dashoffset !== undefined) this._p.setAttributeNS(null, 'stroke-dashoffset', str.dashoffset);
        this._stroke = str;
    }
    
    set fill(str) {
        this._fill = str;
        this._p.setAttributeNS(null, 'fill', this._fill);
    }
    
    set id(str) {
        this._id = str;
        this._p.setAttributeNS(null, 'id', this._id);
    }
    
    set class(str) {
        this._class = str;
        this._p.setAttributeNS(null, 'class', this._class);
    }

    setAttribute(name, value) {
        this._p.setAttributeNS(null, name, value);
    }

    animate(){
        this.stroke = {dasharray: this.length, dashoffset: this.length};
    }
}

function describeArc(center, radius, startAngle, endAngle){
    var start = polarToCartesian(center, radius, startAngle);
    var end = polarToCartesian(center, radius, endAngle);
    var largeArcFlag = endAngle - startAngle > Math.PI ? "1" : "0";
    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
    ].join(" ");
    return d;       
}