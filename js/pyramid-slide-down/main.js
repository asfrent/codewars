// https://www.codewars.com/kata/551f23362ff852e2ab000037

function longestSlideDown (pyramid) {
  const a = pyramid.reverse();
  for (let i = 1; i < a.length; ++i) {
    for (let j = 0; j < a[i].length; ++j) {
      a[i][j] += Math.max(a[i - 1][j], a[i - 1][j + 1]);
    }
  }
  return a[a.length - 1][0];
}
