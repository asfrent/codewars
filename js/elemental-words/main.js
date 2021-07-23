// https://www.codewars.com/kata/56fa9cd6da8ca623f9001233

function transformElements() {
  let m = new Map();
  for (let x in ELEMENTS) {
    m.set(x.toLowerCase(), ELEMENTS[x] + ' (' + x + ')');
  }
  return m;
}

function tryprefix(w, m, crt, a, l) {
  if (w.length < l) return;
  let prefix = w.substring(0, l);
  if (!m.has(prefix)) return;
  let rest = w.substring(l);
  build(rest, m, crt.concat([m.get(prefix)]), a);
}

function build(w, m, crt, a) {
  if (w == '') {
    a.push(crt);
    return;
  }
  tryprefix(w, m, crt, a, 1);
  tryprefix(w, m, crt, a, 2);
  tryprefix(w, m, crt, a, 3);
}

function elementalForms(word) {
  if (word == '') return [];
  word = word.toLowerCase();
  let m = transformElements();
  let acc = [];
  build(word, m, [], acc);
  return acc;
}
