// https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7

function dfs(field, visited, l, c) {
  let d = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  let result = [[l, c]];
  visited[l][c] = true;
  for (let i = 0; i < d.length; ++i) {
    let nl = l + d[i][0];
    let nc = c + d[i][1];
    if (nl < 0 || nl >= field.length || nc < 0 || nc >= field[nl].length) continue;
    if (field[nl][nc] == 0 || visited[nl][nc]) continue;
    result = result.concat(dfs(field, visited, nl, nc));
  }
  return result;
}

function extractShip(field, visited) {
  let startL = -1, startC = -1;
  let foundOne = false;
  for (let i = 0; i < field.length && !foundOne; ++i) {
    for (let j = 0; j < field.length && !foundOne; ++j) {
      if (field[i][j] == 1 && !visited[i][j]) {
        startL = i;
        startC = j;
        foundOne = true;
      }
    }
  }
  if (!foundOne) return [];
  return dfs(field, visited, startL, startC);
}

function genVisited(field) {
  let visited = [];
  for (let i = 0; i < field.length; ++i) {
    visited.push([]);
    for (let j = 0; j < field[i].length; ++j) {
      visited[i].push(false);
    }
  }
  return visited;
}

function validShip(field, shipCoords) {
  if (shipCoords.length > 4) return false;
  let usedLines = [], usedColumns = [];
  for (let i = 0; i < field.length; ++i) {
    usedLines.push(false);
    usedColumns.push(false);
  }
  let distinctLines = 0, distinctColumns = 0;
  for (let i = 0; i < shipCoords.length; ++i) {
    let l = shipCoords[i][0], c = shipCoords[i][1];
    if (!usedLines[l]) {
      distinctLines++;
    }
    usedLines[l] = true;
    if (!usedColumns[c]) {
      distinctColumns++;
    }
    usedColumns[c] = true;
  }
  if (distinctLines != 1 && distinctColumns != 1) return false;
  return true;
}

function updateCounters(counters, shipCoords) {
  ++counters[shipCoords.length];
}

function validateCounters(counters) {
  return counters[1] <= 4 && counters[2] <= 3 && counters[3] <= 2 && counters[4] <= 1;
}

function validateFinalCounters(counters) {
  return counters[1] == 4 && counters[2] == 3 && counters[3] == 2 && counters[4] == 1;
}

function validateBattlefield(field) {
  let counters = [0, 0, 0, 0, 0];
  let visited = genVisited(field);
  while (true) {
    let shipCoords = extractShip(field, visited);
    if (shipCoords.length == 0) {
      break;
    }
    if (!validShip(field, shipCoords)) {
      return false;
    }
    updateCounters(counters, shipCoords);
    if (!validateCounters(counters)) {
      return false;
    }
  }
  return validateFinalCounters(counters);
}