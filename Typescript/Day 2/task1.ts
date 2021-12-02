/// <reference path="../../node_modules/@types\\node/fs.d.ts" />

import * as fs  from 'fs';
import { Instruction } from './Models/Instruction';
import { Position } from './Models/Position';

let instructions: Array<Instruction> = []; 
const text = fs.readFileSync('Day 2/input.txt', 'utf8').toString();
const lines = [...text.split('\n')];
instructions.push(...lines.map(l => { return { action: l.split(' ')[0], length: parseInt(l.split(' ')[1])}; }));

let position: Position = instructions.reduce((prev, curr) => {
  switch (curr.action) {
    case 'forward':
      prev.x += curr.length;
      break;
    case 'up':
      prev.y -= curr.length;
      break;
    default:
      prev.y += curr.length;
      break;
  }
  return prev;
}, { x: 0, y: 0 } as Position);
console.log(position.x * position.y);