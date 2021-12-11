/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

const lines = fs.readFileSync('Input/Day 11.txt', 'utf8').toString().split('\r\n');

let chart:number [][] = [];
lines.forEach(l => {
  let line: number[] = [];
  l.split('').forEach(c => {
    line.push(parseInt(c));
  })

  chart.push(line);
});


let flashedThisRound: number[][] = [];
const flash = (i: number, j: number): void => {
  for (let x: number = i - 1; x <= i + 1; x++) {
    for (let y: number = j - 1; y <= j + 1; y++) {
      if (x >= 0 && y >= 0 && x <= chart.length - 1 && y <= chart[x].length - 1) {
        if (x != i || y != j) {
          chart[x][y] += 1;
          if (chart[x][y] == 10) {
            flash(x, y);
          }
        }
      }
    }
  }
  flashedThisRound.push([i, j]);
}

let synchronized = false;
let rounds = 0;
while (!synchronized) {
  rounds++;
  flashedThisRound = [];
  chart.forEach((line: number[], i: number) => {
    line.forEach((octopus: number, j: number) => {
      chart[i][j] += 1;
      if (chart[i][j] == 10) {
        flash(i, j);
      }
    });
  });
  flashedThisRound.forEach((flash:number[]) => {
    chart[flash[0]][flash[1]] = 0;
  });
  if (chart.reduce((prevOuter, line, i) => {
    return prevOuter && line.reduce((prevInner, octopus, j) => {
      return prevInner && chart[i][j] == 0;
    }, true);
  }, true)) {
    synchronized = true;
  }
}
console.log(rounds);