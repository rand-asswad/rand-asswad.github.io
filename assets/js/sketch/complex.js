class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  abs() {
    return Math.sqrt(this.re**2 + this.im**2);
  }

  arg() {
    return Math.atan2(this.im, this.re);
  }

  conj() {
    this.im = -this.im;
  }

  add(z) {
    if (z instanceof Complex) {
      this.re += z.re;
      this.im += z.im;
    } else {
      this.re += z;
  }
  }
  
  multiply(z) {
    if (z instanceof Complex) {
      let re = this.re;
      this.re = re * z.re - this.im * z.im;
      this.im = re * z.im + this.im * z.re;
    } else {
      this.re *= z;
      this.im *= z;
    }
  }

  div(z) {
    if (z instanceof Complex) {
      let y = new Complex(z.re, z.im);
      y.inv();
      this.multiply(y);
    } else {
      this.multiply(1/z);
    }
  }

  inv() {
    let r = 1/this.abs();
    let phi = -this.arg();
    this.re = r * Math.cos(phi);
    this.im = r * Math.sin(phi);
  }
}

function add(x, y) {
  if (x instanceof Complex) {
    if (y instanceof Complex) return new Complex(x.re + y.re, x.im + y.im);
    return new Complex(x.re + y, x.im);
  }
  if (y instanceof Complex) return add(y, x);
  return new Complex(x + y, 0);
}

function prod(x, y) {
  if (x instanceof Complex) {
    if (y instanceof Complex) {
      let z = new Complex(0, 0);
      z.re = x.re * y.re - x.im * y.im;
      z.im = x.re * y.im + x.im * y.re;
      return z;
    }
    return new Complex(x.re * y, x.im * y);
  }
  if (y instanceof Complex) return multiply(y, x);
  return new Complex(x * y, 0);
}

function divide(x, y) {
  if (x instanceof Complex) {
    let z = new Complex(x.re, x.im);
    z.div(y);
    return z;
  }
  if (y instanceof Complex) {
    let z = new Complex(y.re, y.im);
    z.inv();
    return prod(x, z);
  }
  return x / y;
}


export { Complex, add, prod, divide };