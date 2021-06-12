// Source: https://www.codewars.com/kata/546d15cebed2e10334000ed9

function isValidOperand(operand) {
  return `${parseInt(operand)}` === operand;
}

function goodExp(exp) {
  if (!exp) {
    return false;
  }

  let m = exp.match(/^(-?\d+)([-+*])(-?\d+)=(-?\d+)$/);

  let a = isValidOperand(m[1]) ? parseInt(m[1]) : null;
  let op = m[2];
  let b = isValidOperand(m[3]) ? parseInt(m[3]) : null;
  let c = isValidOperand(m[4]) ? parseInt(m[4]) : null;

  // If we were not able to parse at least one of the operands we're done.
  if (a === null || b === null || c === null) {
    return false;
  }

  if (op === '+') return a + b === c;
  else if (op === '*') return a * b === c;
  else if (op === '-') return a - b === c;
  else return false;
}

function solveExpression(exp) {
  let usedDigits = [];
  for (let i = 0; i < 10; ++i) {
    usedDigits.push(false);
  }
  let digitsInExp = exp.match(/(\d)/g) || [];
  for (let d of digitsInExp) {
    usedDigits[parseInt(d)] = true;
  }
  for (let i = 0; i < 10; ++i) {
    if (usedDigits[i]) continue;
    let completeExp = exp.replace(/\?/g, i);
    if (goodExp(completeExp)) {
      return i;
    }
  }
  return -1;
}
