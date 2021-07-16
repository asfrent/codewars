// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26

function mul(A, B) {
  return [
    BigInt(A[0] * B[0] + A[1] * B[2]), BigInt(A[0] * B[1] + A[1] * B[3]),
    BigInt(A[2] * B[0] + A[3] * B[2]), BigInt(A[2] * B[1] + A[3] * B[3])
  ];
}

function pow(A, p) {
  if (p == 0) return [1n, 0n, 0n, 1n];
  const X = pow(A, Math.floor(p / 2));
  let R = mul(X, X);
  if (p % 2 == 1) {
    R = mul(R, A);
  }
  return R;
}

function fib(n) {
  let A = null;
  if (n < 0) {
    A = [0n, 1n, 1n, -1n];
  } else {
    A = [1n, 1n, 1n, 0n];
  }
  return pow(A, Math.abs(n))[1];
}
