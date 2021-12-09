/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';
import ICommand from './Models/Command';

const display: string[] = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bcdf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];
const commandLength = display.map(d => d.length);
const uniqueLengthCommands = commandLength.map((c, i, arr) => arr.filter(a => a == c).length === 1 ? i : undefined);
const lines = fs.readFileSync('Input/Day 8.txt', 'utf8').toString();
const commands: ICommand[] = lines.split('\r\n').map(l => {
  const input = l.split('|')[0].split(' ');
  const output = l.split('|')[1].split(' ');
  let command = {
    input: [...input],
    output: [...output]
  } as ICommand;
  return command;
});

let result = 0;
commands.forEach(c => {
  uniqueLengthCommands.forEach(uc => {
    if (uc) {
      result += c.output.filter(o => o.length === display[uc].length).length;
    }
  });
})
console.log(result);