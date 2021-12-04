/// <reference path="../../node_modules/@types\\node/fs.d.ts" />

import * as fs  from 'fs';

const text = fs.readFileSync('Input/Day 3.txt', 'utf8').toString();
const lines = [...text.split('\r\n')];

function getValidLine(lines: string[], comparison: number) {
  let epsilon = 0;
  let gamma = 0;
    for (let i = 0; i < lines[0].length; i++) {
    epsilon = gamma = 0;
    lines.map((line) => {
      epsilon += line[i] == '1' ? 1 : 0;
      gamma += line[i] == '0' ? 1 : 0;
    });

    lines = lines.filter(l => l[i] == (epsilon >= gamma && comparison === 0 || epsilon < gamma && comparison === 1 ? '1' : '0') );
    if (lines.length === 1)
      break;
  }
  return lines[0];
}

let oxygenGeneratorRating = getValidLine([...lines], 0);
let co2ScrubberRating = getValidLine([...lines], 1);

console.log(parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2))