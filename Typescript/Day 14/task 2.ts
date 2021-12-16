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

let pairs: any = {};
for(let i = 0; i < polymerFormula.length - 1; i++) {
  const pair = polymerFormula[i] + polymerFormula[i + 1];
  if (i == 0) {
    pairs.start = { 
      characters: pair,
      count: 1 
    };
  } else if (i == polymerFormula.length - 2) {
    pairs.end = { 
      characters: pair,
      count: 1 
    };
  } else {
    if (pairs[pair] === undefined) {
      pairs[pair] = 1;
    } else {
      pairs[pair] += 1;
    }
  }
}

for (let i = 0; i < 40; i++) {
  let copy = JSON.parse(JSON.stringify(pairs));
  insertionRules.forEach(r => {
    if (pairs.start.characters == r[0]) {
      copy.start.characters = r[0][0] + r[1];
      if (copy[r[1] + r[0][1]] !== undefined) {
        copy[r[1] + r[0][1]] += 1;
      } else {
        copy[r[1] + r[0][1]] = 1;
      }
    } 
    if (pairs.end.characters == r[0]) {
      copy.end.characters = r[1] + r[0][1];
      if (copy[r[0][0] + r[1]] !== undefined) {
        copy[r[0][0] + r[1]] += 1;
      } else {
        copy[r[0][0] + r[1]] = 1;
      }
    }
    if (pairs[r[0]] !== undefined) {
      if (copy[r[0][0] + r[1]] !== undefined) {
        copy[r[0][0] + r[1]] += pairs[r[0]]
      } else {
        copy[r[0][0] + r[1]] = pairs[r[0]];
      }

      if (copy[r[1] + r[0][1]] !== undefined) {
        copy[r[1] + r[0][1]] += pairs[r[0]]
      } else {
        copy[r[1] + r[0][1]] = pairs[r[0]];
      }

      copy[r[0]] -= pairs[r[0]];
    }
  });  
  pairs = JSON.parse(JSON.stringify(copy));
}

console.log(pairs);
let charCount: any = {}
for (let pair in pairs) {
  if (pair !== 'start' && pair !== 'end') {
    for (let i = 0; i < 2; i++) {
      if (charCount[pair[i]] !== undefined) {
        charCount[pair[i]] += pairs[pair];
      } else {
        charCount[pair[i]] = pairs[pair];
      }
    }
  }
}

charCount[pairs.start.characters[1]] += 1;
charCount[pairs.end.characters[0]] += 1;
for (let char in charCount) {
  charCount[char] = charCount[char] / 2;
}
charCount[pairs.start.characters[0]] += 1;
charCount[pairs.end.characters[1]] += 1;

let min = Math.pow(2, 64);
let max = -1;
for (let char in charCount) {
  if (min > charCount[char]) {
    min = charCount[char];
  }

  if (max < charCount[char]) {
    max = charCount[char];
  }
}
console.log(max - min);

