/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

import { Point } from './Models/Point';

const text = fs.readFileSync('Input/Day 5.txt', 'utf8').toString();
const lines = [...text.split('\r\n')];
let bubbleLines: Point[][] = [];
lines.forEach(line => {
  const parts = line.split(' -> ');
  let bubbleLine: Point[] = [];
  parts.forEach(part => {
    const xy: string[] = part.split(',');
    let point = new Point(parseInt(xy[0]), parseInt(xy[1]));
    bubbleLine.push(point);
  })
  bubbleLines.push(bubbleLine);
});

bubbleLines = bubbleLines.filter(l => {
  return l[0].x == l[1].x || l[0].y == l[1].y;
});

let board: number[][] = [];
const maxX = bubbleLines.reduce((prev: number, currLine: Point[]) => {
  return Math.max(prev, currLine[0].x, currLine[1].x);
}, 0 as number);
const maxY = bubbleLines.reduce((prev: number, currLine: Point[]) => {
  return Math.max(prev, currLine[0].y, currLine[1].y);
}, 0 as number);
for (let i = 0; i <= maxY; i++) {
  let boardLine: number[] = [];
  for (let j = 0; j <= maxX; j++) {
    boardLine.push(0);
  }
  board.push(boardLine);
}


bubbleLines.forEach(bl => {
  if (bl[0].x == bl[1].x) {
    const startPos = bl[0].y < bl[1].y ? bl[0].y: bl[1].y;
    const endPos = bl[0].y < bl[1].y ? bl[1].y : bl[0].y;
    for (let i = startPos; i <= endPos; i++) {
      board[bl[0].x][i]++; 
    } 
  } else {
    const startPos = bl[0].x < bl[1].x ? bl[0].x: bl[1].x;
    const endPos = bl[0].x < bl[1].x ? bl[1].x : bl[0].x;
    for (let i = startPos; i <= endPos; i++) {
      board[i][bl[0].y]++;
    } 
  }
});

let result = 0;
board.forEach(bl => {
  bl.forEach(c => {
    if (c >= 2) {
      result++;
    }
  });
});

console.log(result);