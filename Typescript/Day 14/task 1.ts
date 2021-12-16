/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

const lines = fs.readFileSync('Input/Day 14.txt', 'utf8').toString().split('\r\n');

let polymerFormula = '';
let insertionRules: string[][] = []
lines.forEach(l => {
  if (l.indexOf('->') == -1 ) {
    if (l.length > 0) {
      polymerFormula = l;
    }
  } else {
    const parts = l.split('->').map(p => p.trim());
    insertionRules.push(parts);
  }
});

const insertElements = (rules: string[][], template: string): string => {
  let result = template.split('');
  let insertedElements: any[] = []
  rules.forEach(r => {
    let start = 0;
    let pos = -1;
    while ((pos = template.indexOf(r[0], start)) >= 0) {
      insertedElements.push({ char: r[1], position: pos + 1});
      start = pos + 1;
    }

  });

  insertedElements = insertedElements.sort((a:any, b: any) => b.position - a.position);
  insertedElements.forEach(ie => {
    result.splice(ie.position, 0, ie.char);
  });

  return result.join('');
}

for (let i = 0; i < 10; i++) {
  polymerFormula = insertElements(insertionRules, polymerFormula);
}

let characterCount: any = {}
for (let i = 0; i < polymerFormula.length; i++) {
  if (characterCount[polymerFormula[i]] === undefined) {
    characterCount[polymerFormula[i]] = 1
  } else {
    characterCount[polymerFormula[i]] += 1
  }
}
console.log(polymerFormula);
console.log(characterCount);
let max = -1;
let min = polymerFormula.length + 1;
for (let char in characterCount) {
  if (characterCount[char] > max) {
    max = characterCount[char];
  }

  if (characterCount[char] < min) {
    min = characterCount[char];
  }
}

console.log(max - min);