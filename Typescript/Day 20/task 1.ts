/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

const lines = fs.readFileSync('Input/Day 20.txt', 'utf8').toString().split('\r\n');

let algorithm = lines[0];

const enhancePoint = (x: number, y: number, image: string[][], round: number): string => {
  let enhancementString = '';
  for (let j = y - 1; j < y + 2; j++) {
    for (let i = x - 1; i < x + 2; i++) {
      if (j >= 0 && i >= 0 && j < image.length && i < image[0].length) {
        enhancementString += (image[j][i] == '#' ? '1' : '0'); 
      } else {
        if (round % 2 == 1) {
          enhancementString += (algorithm[0] == '#' ? '1' : '0');
        } else {
          if (algorithm[0] == '#') {
            enhancementString += (algorithm[algorithm.length - 1] == '#' ? '1' : '0');
          } else {
            enhancementString += '0'
          }
        } 
      }
    }
  }

  return algorithm[parseInt(enhancementString, 2)];
}

const enhance = (image: string[][], round: number): string[][] => {
  let enhanced: string[][] = []

  for (let y = -1; y <= image.length; y++) {
    let newLine: string[] = [];
    for (let x = -1; x <= image[0].length; x++) {
      
      let newVal = enhancePoint(x, y, image, round);
      newLine.push(newVal);
    }
    enhanced.push(newLine);
  }
  return enhanced;
}

let image: string[][] = [];


for (let i = 1; i < lines.length; i++) {
  if (lines[i] == '') {
    continue;
  }

  image.push(lines[i].split(''));
}

for (let i = 0; i < 2; i++) {
  image = enhance(image, i);
}

let count = 0;
image.forEach(line => {
  count += line.filter(point => point === '#').length;
});

console.log(count);