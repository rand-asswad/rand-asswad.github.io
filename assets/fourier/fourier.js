

const TAU = 2 * Math.PI;

function FourierCoefs(f, nb_coefs) {
    const coefs = [];
    const M = f.length;
    const N = nb_coefs;//Math.floor(nb_coefs / 2);

    for (let n = 0; n < N; n++) {
        c = new Complex(0, 0);
        for (let k = 0; k < M; k++) {
            let phi = TAU * n * k / M;
            c.add(prod(f[k], new Complex(cos(phi), -sin(phi))));
        }
        c.div(M);
        coefs[n] = {index: n, re: c.re, im: c.im, r: c.abs(), arg: c.arg()};
    }

    return coefs;
}