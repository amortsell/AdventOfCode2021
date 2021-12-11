/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

const lines = fs.readFileSync('Input/Day 10.txt', 'utf8').toString().split('\r\n');

const values: any =  {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137 
}

let result: number = 0;

lines.some(l => {
  let stack: string[] = [];
  l.split('').forEach(c => {
    switch (c) {
      case '(':
      case '{':
      case '[':
      case '<':
        stack.push(c);
        break;
      default:
        const end = stack.pop();
        switch (end) {
          case '(':
            if (c !== ')') {
              result += values[c];
              return false;
            }
            break;
          case '{':
            if (c !== '}') {
              result += values[c];
              return false;
            }
            break;
          case '[':
            if (c !== ']') {
              result += values[c];
              return false;
            }
            break;
          case '<':
            if (c !== '>') {
              result += values[c];
              return false;
            }
            break;
          default:
            console.log('Syntax error');
            return false;
                
        }
    }
  });
});

console.log(result);