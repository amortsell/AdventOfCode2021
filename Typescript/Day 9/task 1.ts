/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

const lines = fs.readFileSync('Input/Day 9.txt', 'utf8').toString().split('\r\n');
let count: number = 0;
lines.forEach((l, i) => {
  const points = l.split('');
  points.forEach((p, j) => {
    let lowPoint: boolean = true;
    if (i > 0 && parseInt(lines[i-1][j]) <= parseInt(lines[i][j])) {
      lowPoint = false;
      return;
    }
    if (j > 0 && parseInt(lines[i][j - 1]) <= parseInt(lines[i][j])) {
      lowPoint = false;
      return;
    }
    if (i < lines.length - 1 && parseInt(lines[i + 1][j]) <= parseInt(lines[i][j])) {
      lowPoint = false;
      return;
    }

    if (j < l.length - 1 && parseInt(lines[i][j + 1]) <= parseInt(lines[i][j])) {
      lowPoint = false;
      return;
    }

    if (lowPoint) {
      count += parseInt(lines[i][j]) + 1;
    }

  });
});
console.log(count);