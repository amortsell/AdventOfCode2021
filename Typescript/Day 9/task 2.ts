/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

import { Point } from './Models/Point';

const checkPoint = (lines: string[], lastValue: number, i: number, j: number, basinPoints: Point[], directions: number[]): void => {
  if (parseInt(lines[i][j]) >= lastValue && parseInt(lines[i][j]) < 9) {
    if (basinPoints.find(p => p.i == i && p.j == j) == undefined) {
      let basinPoint = new Point(i, j);
      if (directions.indexOf(0) === -1) {
        basinPoint.directions.push(2);
      } else if (directions.indexOf(1) === -1) {
        basinPoint.directions.push(3);
      } else if (directions.indexOf(2) === -1) {
        basinPoint.directions.push(0);
      } else {
        basinPoint.directions.push(1);
      }
      basinPoints.push(basinPoint);
    } else {
      let basinPoint = basinPoints.find(p => p.i == i && p.j == j);
      if (basinPoint) {
        if (!basinPoint.directions)
          basinPoint.directions = [];
        if (directions.indexOf(0) === -1) {
          if (basinPoint.directions.indexOf(2) >= 0)
            directions = directions.splice(directions.indexOf(2), 1);
          else 
            basinPoint.directions.push(2);
        } else if (directions.indexOf(1) === -1) {
          if (basinPoint.directions.indexOf(3) >= 0)
            directions = directions.splice(directions.indexOf(3), 1);
          else 
            basinPoint.directions.push(3);
        } else if (directions.indexOf(2) === -1) {
          if (basinPoint.directions.indexOf(0) >= 0)
            directions = directions.splice(directions.indexOf(0), 1);
          else 
            basinPoint.directions.push(0);
        } else {
          if (basinPoint.directions.indexOf(1) >= 0)
            directions = directions.splice(directions.indexOf(1), 1);
          else 
            basinPoint.directions.push(1);
        }    
      }
    }
    directions.forEach(direction => {
      switch (direction) {
        case 0: // up
          if (i > 0)
            checkPoint(lines, parseInt(lines[i][j]), i - 1, j, basinPoints, [0, 1, 3]);
          break;
        case 1: // right
          if (j < lines[i].length - 1)
            checkPoint(lines, parseInt(lines[i][j]), i, j + 1, basinPoints, [0, 1, 2]);
          break;
        case 2: // down
          if (i < lines.length - 1)
            checkPoint(lines, parseInt(lines[i][j]), i + 1, j, basinPoints, [1, 2, 3]);
          break;
        case 3: // left
          if (j > 0)
            checkPoint(lines, parseInt(lines[i][j]), i, j - 1, basinPoints, [0, 2, 3]);
          break;        
      }  
    });
  }
}

const lines = fs.readFileSync('Input/Day 9.txt', 'utf8').toString().split('\r\n');
let basins: number[] = [0, 0, 0];
lines.forEach((l, i) => {
  const points = l.split('');
  points.forEach((p, j) => {
    let basinPoints: Point[] = [];
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
      basinPoints.push(new Point(i, j));
      // 0 = up, 1 = right, 2 = down, 3 = left
      // Check point above current point
      if (i > 0)
        checkPoint(lines, parseInt(lines[i][j]), i - 1, j, basinPoints, [0, 1, 3]);
      // Check point to the left of current point
      if (j > 0) 
        checkPoint(lines, parseInt(lines[i][j]), i, j - 1, basinPoints, [0, 2, 3]); 
      // Check point below current point
      if (i < lines.length - 1)
        checkPoint(lines, parseInt(lines[i][j]), i + 1, j, basinPoints, [1, 2, 3]);
      // check point to the rigth of current point
      if (j < lines[i].length - 1)
        checkPoint(lines, parseInt(lines[i][j]), i , j+ 1, basinPoints, [0, 1, 2]);

      const count = basinPoints.length;
      if (Math.min(...basins) < count) {
        const min = Math.min(...basins);
        for (i = 0; i < basins.length; i++) {
          if (basins[i] == min) {
            basins[i] = count;
            break;
          }
        }
      }
    }

  });
});
console.log(basins[0] * basins[1] * basins[2]);