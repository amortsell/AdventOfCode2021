/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';


const text = fs.readFileSync('Input/Day 6.txt', 'utf8').toString();
let fish: number[] = [...text.split(',').map(f => parseInt(f))];

let days: number = 80;


for (let i = 0; i < days; i++) {
  let newFish = 0;
  let curr: any;
  fish = fish.map(f => {
    if (f == 0) {
      newFish++;
      return 6;
    } else {
      return f - 1;
    }
  });

  for (let j = 0; j < newFish; j++) {
    fish.push(8);
  }
}
console.log(fish.length);