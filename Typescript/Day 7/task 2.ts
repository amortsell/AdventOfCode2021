/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';


const text = fs.readFileSync('Input/Day 7.txt', 'utf8').toString();
let squid: number[] = [...text.split(',').map(f => parseInt(f))];

const cost = (s1: number, s2: number): number => {
  const start = s1 < s2 ? s1 : s2;
  const end = s1 < s2 ? s2 : s1;
  let result = 0;
  for (let i = 1, j = start + 1; j <= end; i++, j++) {
    result += i; 
  }
  return result;
}

const minX = Math.min(...squid);
const maxX = Math.max(...squid);
const steps: number[]  = []
for (let x = minX; x <= maxX; x++) {
  steps.push(x);
}

let result = steps.reduce((prev1, s1) => {
  const sum = squid.reduce((prev2, s2) => {
    return prev2 + cost(s1, s2)
  }, 0);
  return prev1 == -1 ? sum : Math.min(sum, prev1);
}, -1);

console.log(result);