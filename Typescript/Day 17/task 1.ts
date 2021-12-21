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

  let topY = 0;

  if (yEnd < 0) {
    let lastY = 0;
    let currentY = (-1 * yEnd) - 1;
    while (currentY > 0) {
      if (currentY > lastY ) {
        topY = currentY;
        let step = currentY - lastY;
        lastY = currentY;
        currentY += step - 1;
      } else if (currentY == lastY) {
        currentY -= 1;
      } else {
        let step = lastY - currentY;
        lastY = currentY;
        currentY -= step + 1;
      }
    }
    
  }

  console.log(topY);
}