/// <reference path="../../node_modules/@types\\node/fs.d.ts" />

import * as fs  from 'fs';

let lines: string[] = []; 
const text = fs.readFileSync('Input/Day 1.txt', 'utf8').toString();
lines.push(...text.split('\n'));

let count = 0;
lines.map((x, i, arr) => {
  count += i > 2 ? arr.slice(i - 2, i + 1).reduce((prev, n) => parseInt(n) + prev, 0) > arr.slice(i-3, i).reduce((prev, n) => parseInt(n) + prev, 0) ? 1 : 0: 0;
});
console.log(count);