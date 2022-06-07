const PI = Math.PI;
const TAU = 2 * Math.PI;
const HALF_PI = Math.PI / 2;

function polarToCartesian(center, radius, angle) {
  return {
    x: center.x + (radius * Math.cos(angle)),
    y: center.y + (radius * Math.sin(angle))
  };
}

export { PI, TAU, HALF_PI, polarToCartesian };