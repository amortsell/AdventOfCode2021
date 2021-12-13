/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';
import { Cave } from './Models/Cave'

const lines = fs.readFileSync('Input/Day 12.txt', 'utf8').toString().split('\r\n');

let input: Cave[] = [];
let paths: string[] = [];
lines.forEach(l => {
  const steps = l.split('-');
  let start = input.find(c => c.name == steps[0]);
  let end = input.find(c => c.name == steps[1]);
  if (start == null) {
    start = new Cave(steps[0]);
    input.push(start);
  } 

  if (end == null) {
    end = new Cave(steps[1]);
    input.push(end);
  }
  start.connectedCaves.push(end);
  end.connectedCaves.push(start);

});

const buildPath = (initial: string, c: Cave): string[] => {
  let result: string[] = [];
  c.connectedCaves.forEach(cc => {
    if (cc.name == 'end') {
      result.push(initial + ',' + cc.name);
    } else if (cc.name == cc.name.toUpperCase() || initial.indexOf(cc.name) == -1) {
      result = result.concat(buildPath(initial + ',' + cc.name, cc));
    }
  })
  return result;
}

const start = input.find(c => c.name == 'start');
if (start && !start.connectedCaves) {
  start.connectedCaves = [];
}
if (start) {
  paths = buildPath('start', start);
}
console.log(paths.length);


