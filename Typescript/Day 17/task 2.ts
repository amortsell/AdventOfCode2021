/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

const lines = fs.readFileSync('Input/Day 17.txt', 'utf8').toString().split('\r\n');

const regex = /x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/;
const matches = regex.exec(lines[0]);
console.log(matches)

if (matches != null) {
  let xStart = parseInt(matches[1]) || 0;
  let xEnd = parseInt(matches[2]) || 0;
  let yStart = parseInt(matches[3]) || 0;
  let yEnd = parseInt(matches[4]) || 0;

  if (yEnd > yStart) {
    const tmp = yStart;
    yStart = yEnd;
    yEnd = tmp;
  }

  if (xEnd < xStart) {
    const tmp = xStart;
    xStart = xEnd;
    xEnd = tmp;
  }

  const checkSettings = (currentX: number, currentY: number, x: number, y: number): boolean => {
    if (currentX >= xStart && currentX <= xEnd && currentY <= yStart && currentY >= yEnd) {
      return true;
    } else if (currentX < xStart && x == 0 || currentX > xEnd) {
      return false;
    } else if (currentY < yEnd) {
      return false;
    }

    currentX += x;
    currentY += y;
    if (x > 0) {
      return checkSettings(currentX, currentY, x - 1, y - 1);
    } else {
      return checkSettings(currentX, currentY, x, y - 1);
    }
  }

  let validSettings: number[][] = [];
  for (let x = 1; x <= xEnd; x++) {
    for (let y = yEnd; y < -1 * yEnd; y++) {
      if (checkSettings(0, 0, x, y)) {
        validSettings.push([x, y]);
      }
    }
  }
  console.log(validSettings.length);
}

