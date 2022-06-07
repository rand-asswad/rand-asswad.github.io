const ns = 'http://www.w3.org/2000/svg';

class Element {
  constructor(parent, tag, attr) {
    this._node = document.createElementNS(ns, tag);
    if (parent instanceof Element) {
      this._parent = parent;
      parent.node.appendChild(this._node);
    } else {
      this._parent = document.getElementById(parent);
      this._parent.appendChild(this._node);
    }
    if (attr) Object.keys(attr).forEach((key, index) => {
      this.setAttribute(key, attr[key]);
    });
  }
  
  getAttribute(name) {return this._node.getAttribute(name);}
  setAttribute(name, value) {if (value) this._node.setAttributeNS(null, name, value);}
  removeAttribute(name) {this._node.removeAttribute(name);}

  get node() {return this._node;}
  get parent() {return this._parent;}
  set id(str) {this.setAttribute('id', str);}
  set class(str) {this.setAttribute('class', str);}

  createElement(tag, attr) {
    return createElement(this, tag, attr);
  }
}

function createElement(parent, tag, attr) {
  if (tag == 'circle') return new Circle(parent, attr);
  if (tag == 'line') return new Line(parent, attr);
  if (tag == 'polyline') return new Polyline(parent, attr);
  return new Element(parent, tag, attr);
}

class SVG extends Element {
  constructor(parent) {
    super(parent, "svg");
  }

  set viewBox(str) {this.setAttribute('viewBox', str);}
  set width(str) {this.setAttribute('width', str);}
  set height(str) {this.setAttribute('height', str);}
}

class Circle extends Element {
  constructor(parent, attr) {
    super(parent, "circle", attr);
  }

  get radius() {return this.getAttribute('r');}
  get center() {
    return {
      x: this.getAttribute('cx'),
      y: this.getAttribute('cy')
    }
  }

  set radius(r) {this.setAttribute('r', r);}
  set center(c) {
    this.setAttribute('cx', c.x);
    this.setAttribute('cy', c.y);
  }
}

class Line extends Element {
  constructor(parent, attr) {
    super(parent, 'line', attr);
  }

  get start() {
    return {
      x: this.getAttribute('x1'),
      y: this.getAttribute('y1')
    }
  }
  
  get end() {
    return {
      x: this.getAttribute('x2'),
      y: this.getAttribute('y2')
    }
  }

  set start(point) {
    this.setAttribute('x1', point.x);
    this.setAttribute('y1', point.y);
  }
  
  set end(point) {
    this.setAttribute('x2', point.x);
    this.setAttribute('y2', point.y);
  }
}

class Polyline extends Element {
  constructor(parent, attr) {
    super(parent, 'polyline', attr);
    this.length = 0;
  }

  push(point) {
    let pts = this.getAttribute('points');
    if (pts) pts += ' ' + point.x + ',' + point.y;
    else pts = point.x + ',' + point.y;
    this.setAttribute('points', pts);
    this.length++;
  }

  pop() {
    let pts = this.getAttribute('points');
    if (pts && this.length > 0) {
      let ind = pts.indexOf(' ');
      if (ind == -1) {
        this.setAttribute('points', '');
        this.length = 0;
      }
      else {
        this.setAttribute('points', pts.substr(ind + 1));
        this.length--;
      }
    }
  }
}

export { Element, SVG, Circle, Line, Polyline, createElement };