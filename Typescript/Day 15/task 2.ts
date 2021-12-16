/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

import {Point} from './Models/Point';
import { Position } from './Models/Position';
const lines = fs.readFileSync('Input/Day 15.txt', 'utf8').toString().split('\r\n');

let graph: Point[][] = [];

const maxValue = Math.pow(2, 64);
for (let i = 0; i < 5; i++) {
  lines.forEach(l => {
    let gl: Point[] = []
    for (let j = 0; j < 5; j++) {
      l.split('').map(c => parseInt(c) + i + j <= 9 ? parseInt(c) + i + j : parseInt(c) + i + j - 9).forEach(c => {
        let p: Point = new Point(c);
        gl.push(p);
      });
    }
    graph.push(gl);
  });
}
graph[0][0].cost = 0;

let path: Position[] = []
const selectNode = (p: Position, path: Position[]): Position => {
  let nextP = new Position(-1, -1);
  let min: number = Math.pow(2, 64);
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (p.x + i >= 0 && 
        p.x + i < graph.length && 
        p.y + j >= 0 && 
        p.y + j < graph[0].length) {
          if ((i != 0 || j != 0) && Math.abs(i) !== Math.abs(j)) {
            if (graph[p.x + i][p.y + j].cost < min && !graph[p.x + i][p.y + j].visited) {
              min = graph[p.x + i][p.y + j].cost
              nextP.x = p.x + i;
              nextP.y = p.y + j;
            }
        }
      }
    }
  }

  if (nextP.x == -1 && path.length > 0) {
    p = path.pop() || nextP;
    return selectNode(p, path);
  } else {
    return nextP;
  }
}

const correctSurrounding = (p: Position): void => {
  if (p.x > 0 && graph[p.x - 1][p.y].cost < maxValue && 
    graph[p.x][p.y].cost + graph[p.x - 1][p.y].risk < graph[p.x - 1][p.y].cost) {
      graph[p.x - 1][p.y].cost = graph[p.x][p.y].cost + graph[p.x - 1][p.y].risk;
      correctSurrounding(new Position(p.x - 1, p.y));
  }
  if (p.y > 0 && graph[p.x][p.y - 1].cost < maxValue && 
    graph[p.x][p.y].cost + graph[p.x][p.y - 1].risk < graph[p.x][p.y - 1].cost) {
      graph[p.x][p.y - 1].cost = graph[p.x][p.y].cost + graph[p.x][p.y - 1].risk;
      correctSurrounding(new Position(p.x, p.y - 1));
  }
  if (p.x < graph.length -  1 && graph[p.x + 1][p.y].cost < maxValue && 
    graph[p.x][p.y].cost + graph[p.x + 1][p.y].risk < graph[p.x + 1][p.y].cost) {
      graph[p.x + 1][p.y].cost = graph[p.x][p.y].cost + graph[p.x + 1][p.y].risk;
      correctSurrounding(new Position(p.x + 1, p.y));
  }
  if (p.y < graph[0].length - 1 && graph[p.x][p.y + 1].cost < maxValue && 
    graph[p.x][p.y].cost + graph[p.x][p.y + 1].risk < graph[p.x][p.y + 1].cost) {
      graph[p.x][p.y + 1].cost = graph[p.x][p.y].cost + graph[p.x][p.y + 1].risk;
      correctSurrounding(new Position(p.x, p.y + 1));
  }

  
}

let current: Position = new Position(0, 0);
while (!graph[graph.length - 1][graph[0].length - 1].visited) { 
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (current.x + i >= 0 && 
        current.x + i < graph.length && 
        current.y + j >= 0 && 
        current.y + j < graph[0].length) {
          if ((i != 0 || j != 0) && Math.abs(i) !== Math.abs(j)) {
            const risk = graph[current.x + i][current.y + j].risk;
            const cost = graph[current.x][current.y].cost;
            graph[current.x + i][current.y + j].cost = Math.min(cost + risk, graph[current.x + i][current.y + j].cost);
            correctSurrounding(current);
          }
        }
    }
  }
  graph[current.x][current.y].visited = true;
  path.push(current);
  current = selectNode(current, path);
}

let unvisitedPoints: (Position)[] = [];
graph.forEach((row, i) => {
  let unvisitedPositions: Position[] = row.reduce((prev: Position[], current: Point, j: number) => {
    if (current.visited == false) {
      prev.push(new Position(i, j));
    }
    return prev;
  }, [] as Position[]);
  unvisitedPoints = unvisitedPoints.concat(unvisitedPositions);  
});
unvisitedPoints.forEach(p => correctSurrounding(p));
console.log(graph[graph.length - 1][graph[0].length - 1].cost);
