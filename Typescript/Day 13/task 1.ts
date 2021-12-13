/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';
import { FoldPoint } from './Models/FoldPoint';

const lines = fs.readFileSync('Input/Day 13.txt', 'utf8').toString().split('\r\n');

let maxX: number = 0
let maxY: number = 0;
let points: number[][] = [];
let foldPoints: FoldPoint[] = [];
lines.forEach(l => {
  if (l.indexOf(',') >= 0) {
    const coords = l.split(',').map(c => parseInt(c));
    if (coords[0] > maxX) {
      maxX = coords[0];
    }

    if (coords[1] > maxY) {
      maxY = coords[1];
    }

    points.push(coords);
  } else {
    const regex = /fold along ([x|y])=(\d+)/;
    let matches: RegExpMatchArray | null;
    matches = l.match(regex);
    if (matches && matches.length >= 3) {
      const foldPoint = new FoldPoint(matches[1], parseInt(matches[2]));
      foldPoints.push(foldPoint);
    }
  }
});

let chart: string[][] = [];
for (let y = 0; y <= maxY; y++) {
  let line: string[] = [];
  for (let x = 0; x <= maxX; x++) {
    line.push('.');
  }
  chart.push(line);
}

points.forEach(p => {
  chart[p[1]][p[0]] = '#';
});

const fold = (chart: string[][], pos: number, dir: string): string[][] => {
  let result: string[][] = []
  if (dir === 'x') {
    const part1: string[][] = chart.map(l => {
      return l.slice(pos + 1)
    });
    for (let x = 0; x < chart.length; x++) {
      let line: string[] = [];
      for (let y = Math.max(pos - 1, part1[0].length - 1); y >= 0; y--) {
        if (y < pos && chart[x][y] === '#' || y < part1[0].length && part1[x][(pos - 1) - y] === '#') {
          line.push('#')
        } else {
          line.push('.');
        }
      }
      result.push(line.reverse());
    }
  } else if (dir === 'y') {
    const part1: string[][] = chart.slice(pos + 1);
    const maxX = Math.max(part1.length - 1, pos - 1);
    for (let x = maxX; x >= 0; x--) {
      let line: string[] = [];
      for (let y = 0; y < chart[0].length; y++) {
        if (x < pos && x >= 0 && chart[x][y] === '#' || maxX - x < part1.length && maxX - x >= 0 && part1[maxX - x][y] === '#') {
          line.push('#')
        } else {
          line.push('.');
        }
      }
      result.push(line);
    }
    result = result.reverse();
  }
  return result;
}

chart = fold(chart, foldPoints[0].position, foldPoints[0].direction);

let result: number = 0;
chart.forEach(line => {
  line.forEach(c => {
    if (c == '#') {
      result++;
    }
  });
});
console.log(result);