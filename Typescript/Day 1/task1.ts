/// <reference path="../../node_modules/@types\\node/fs.d.ts" />

import * as fs  from 'fs';

let lines: string[] = []; 
const text = fs.readFileSync('Input/Day 1.txt', 'utf8').toString();
lines.push(...text.split('\n'));
console.log(lines);
let count = 0;
lines.map((x, i) => count += i > 0 ? parseInt(x) > parseInt(lines[i - 1]) ? 1 : 0: 0);
console.log(count);