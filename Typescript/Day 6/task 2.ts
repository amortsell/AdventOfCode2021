/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';


const text = fs.readFileSync('Input/Day 6.txt', 'utf8').toString();
let fish: number[] = [...text.split(',').map(f => parseInt(f))];

let days: number = 256;
// Count number of days left until newly added fish breed
let newFish: any = {};
// Count number of days left until added fish that has breeded once breed again
let matureFish: any = {}
for (let i = 0; i < days; i++) {
  let addedFish = 0;
  let curr: any;
  fish = fish.map(f => {
    if (f == 0) {
      addedFish++;
      return 6;
    } else {
      return f - 1;
    }
  });

  let completedFish = 0;
  for (let j = 0; j < 6; j++) {
    if (j == 0) {
      if (matureFish[j.toString()]) {
        addedFish += matureFish[j.toString()];
        // Save number of added fish that rebreed in this round and add them to the list at the end of the round.
        completedFish = matureFish[j.toString()];
      }
    }
    matureFish[j.toString()] = matureFish[(j + 1).toString()] || 0;
  }
  for (let j = 0; j < 8; j++) {
    if (j == 0) {
      if (newFish[j.toString()]) {
        addedFish += newFish[j.toString()];
        matureFish['6'] = newFish[j.toString()];
      } else {
        matureFish['6'] = 0;
      }
    }
    newFish[j.toString()] = newFish[(j + 1).toString()] || 0;
  }
  newFish['8'] = addedFish;
  // Add number of added fish that rebreed in this round to the restarted mature fish.
  matureFish['6'] += completedFish
}
let result = fish.length;
for (const prop in newFish) {
  if (newFish.hasOwnProperty(prop)) {
    result += newFish[prop];
  }
}

for (const prop in matureFish) {
  if (matureFish.hasOwnProperty(prop)) {
    result += matureFish[prop];
  }
}
console.log(result);