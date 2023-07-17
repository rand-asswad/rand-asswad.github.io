function FourierCoefs(o,r,e=!0){const t=[],l=o.length,m=e?Math.floor(r/2):0;for(let i=-m;i<r-m;i++){let r=new Complex(0,0);for(let e=0;e<l;e++){let t=TAU*i*e/l;r.add(prod(o[e],new Complex(Math.cos(t),-Math.sin(t))))}r.div(l),e||r.multiply(2),t.push({index:i,re:r.re,im:r.im,r:r.abs(),arg:r.arg()})}return t}import{TAU}from"./math.js";import{Complex,prod}from"./complex.js";export{FourierCoefs};