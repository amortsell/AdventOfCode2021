/// <reference path="../../node_modules/@types\\node/fs.d.ts" />

import * as fs  from 'fs';

const text = fs.readFileSync('Input/Day 3.txt', 'utf8').toString();
const lines = [...text.split('\r\n')];
let epsilon = 0;
let gamma = 0;
let strEpsilon = '';
let strGamma = ''
for (let i = 0; i < lines[0].length; i++) {
  epsilon = gamma = 0;
  lines.map((line) => {
    epsilon += line[i] == '1' ? 1 : 0;
    gamma += line[i] == '0' ? 1 : 0;
  });

  strEpsilon += epsilon >= gamma ? '1' : '0';
  strGamma += epsilon > gamma ? '0' : '1';

}
console.log(parseInt(strEpsilon, 2));
console.log(parseInt(strGamma, 2));
console.log(parseInt(strEpsilon, 2) * parseInt(strGamma, 2))