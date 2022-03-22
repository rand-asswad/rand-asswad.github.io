import { TAU } from './math.js';
import { Complex, prod } from './complex.js';

function FourierCoefs(f, nb_coefs, sym = true) {
  const coefs = [];
  const M = f.length;
  const N = (sym) ? Math.floor(nb_coefs / 2) : 0;

  for (let n = -N; n < nb_coefs - N; n++) {
    let c = new Complex(0, 0);
    for (let k = 0; k < M; k++) {
      let phi = TAU * n * k / M;
      c.add(prod(f[k], new Complex(Math.cos(phi), -Math.sin(phi))));
    }
    c.div(M);
    if (!sym) c.multiply(2);
    coefs.push({index: n, re: c.re, im: c.im, r: c.abs(), arg: c.arg()});
  }

  return coefs;
}

export { FourierCoefs };