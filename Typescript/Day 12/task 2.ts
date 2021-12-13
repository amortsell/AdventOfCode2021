/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';
import * as fs  from 'fs';
import { getHeapSnapshot } from 'v8';
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

const buildPath = (initial: string, c: Cave, allowTwice: string): string[] => {
  let result: string[] = [];
  c.connectedCaves.forEach(cc => {
    if (cc.name == 'end') {
      result.push(initial + ',' + cc.name);
    } else if (cc.name == cc.name.toUpperCase()) {
      result = result.concat(buildPath(initial + ',' + cc.name, cc, allowTwice));
    } else {
      if (cc.name != 'start') {
        let regex = new RegExp('(' + cc.name + ')', 'g');
        const maxHits = cc.name == allowTwice ? 1 : 0
        const matches = initial.match(regex);
        if (!matches || matches.length <= maxHits) {
          result = result.concat(buildPath(initial + ',' + cc.name, cc, allowTwice));
        }
      }
    }
  });
  return result;
}

const smallCaves = input.filter(c => {
  return c.name !== c.name.toUpperCase() && c.name !== 'start' && c.name !== 'end';
});
const unique = ((value: string, index: number, self: string[]) : boolean => {
  return self.indexOf(value) === index;
});
smallCaves.forEach(sc => {
  let tmpPaths: string[] = [];
  const start = input.find(c => c.name == 'start');
  const allowTwice = sc.name;
  if (start && !start.connectedCaves) {
    start.connectedCaves = [];
  }
  if (start) {
    tmpPaths = buildPath('start', start, allowTwice);
  }
  paths = paths.concat(tmpPaths).filter(unique);

});


console.log(paths.filter(unique).length);


