// Multiplies X (a reversed digit array) with Y (integer) and stores the
// result in X.
function mul(x, y) {
  let t = 0;
  for (let i = 0; i < x.length; ++i) {
    x[i] = x[i] * y + t;
    t = Math.floor(x[i] / 10);
    x[i] %= 10;
  }
  while (t > 0) {
    x.push(t % 10);
    t = Math.floor(t / 10);
  }
}

// Computes factorial of n (large).
function factorial(n){
  let p = [1];
  for (let i = 1; i <= n; ++i) {
    mul(p, i);
  }
  return p.map(digit => String(digit)).reverse().join('');
}