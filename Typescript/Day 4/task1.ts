/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

import { Board } from './Models/Board';
import { Cell } from './Models/Cell';

const text = fs.readFileSync('Input/Day 4.txt', 'utf8').toString();
const lines = [...text.split('\r\n')];
let rounds: number[] = [];
let boards: Board[] = [];
let board: Board = new Board();
lines.forEach(line => {
  if (line.indexOf(',') > -1) {
    rounds = line.split(',').map(r => parseInt(r))
  } else if (line.trim() === '') {
    if (!board.isEmpty()) {
      boards.push(board);
    }  
    board = new Board();
  }
  else {
    const cells: Cell[] = line.split(' ').filter(l=> l.trim() !== '').map(v => {
      let cell = new Cell();
      cell.hit = false;
      cell.value = parseInt(v);
      return cell;
    });
    board.rows.push(cells);
  }
});

let found = false;
rounds.some(round => {
  boards.some(board => {
    board.hitCell(round);
    if (board.hasBingo()) {
      let result = board.countUnmarked() * round;
      console.log(result);
      found = true;
      return found;
    }
  });
  return found; 
});