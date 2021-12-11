/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

const lines = fs.readFileSync('Input/Day 10.txt', 'utf8').toString().split('\r\n');

const values: any =  {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4 
}

let results: number[] = [];

const incompleteLines = lines.filter(l => {
  let stack: string[] = [];
  let erroneous = false;
  l.split('').some(c => {

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
              erroneous = true;
              return false;
            }
            break;
          case '{':
            if (c !== '}') {
              erroneous = true;
              return false;
            }
            break;
          case '[':
            if (c !== ']') {
              erroneous = true;
              return false;
            }
            break;
          case '<':
            if (c !== '>') {
              erroneous = true;
              return false;
            }
            break;
          default:
            console.log('Syntax error');
            erroneous = true;
            return false;
                
        }
    }

  });
  return !erroneous;
});

incompleteLines.forEach(l => {
  let lineResult = 0;
  let stack: string[] = [];
  let completingTokens: string[] = [];
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
              return false;
            }
            break;
          case '{':
            if (c !== '}') {
              return false;
            }
            break;
          case '[':
            if (c !== ']') {
              return false;
            }
            break;
          case '<':
            if (c !== '>') {
              return false;
            }
            break;
          default:
            console.log('Syntax error');
            return false;
                
        }
    }
  });
  while (stack.length) {
    let current = stack.pop();
    switch (current) {
      case '(':
        completingTokens.push(')');
        break;
      case '{':
        completingTokens.push('}');
        break;
      case '[':
        completingTokens.push(']');
        break;
      case '<':
        completingTokens.push('>');
        break;
    }
  }
  
  completingTokens.forEach(t => {
    lineResult *= 5;
    lineResult += values[t];
  })
  
  results.push(lineResult);

})
results = results.sort((a: number, b: number) => a - b);

console.log(results[Math.floor(results.length/2)]);