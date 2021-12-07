/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';


const text = fs.readFileSync('Input/Day 7.txt', 'utf8').toString();
let squid: number[] = [...text.split(',').map(f => parseInt(f))];

let result = squid.reduce((prev1, s1) => {
  const sum = squid.reduce((prev2, s2) => {
    return prev2 + Math.abs(s2 - s1)
  }, 0);
  return prev1 == -1 ? sum : Math.min(sum, prev1);
}, -1);

console.log(result);