/// <reference path="../../node_modules/@types\\node/fs.d.ts" />
import * as fs  from 'fs';

import { Package } from './Models/Package';

const lines = fs.readFileSync('Input/Day 16.txt', 'utf8').toString().split('\r\n');

const hex2bin = (hex: string) : string => {
  return (parseInt(hex, 16).toString(2)).padStart(4 * hex.length, '0');
}

const bin2dec = (bin: string) : number => {
  return parseInt(bin, 2);
}

const rules: any = {
  versionPosition: 0,
  versionEnd: 3,
  typeIdPosition: 3,
  typeIdEnd: 6,
  lengthType: {
    '0': {
      length: 15
    },
    '1': {
      length: 11
    }
  }
}

const readPackage = (input: string): Package  => {
  let packet = new Package();
  packet.version = bin2dec(input.substring(rules.versionPosition, rules.versionEnd));
  packet.typeId = bin2dec(input.substring(rules.typeIdPosition, rules.typeIdEnd));
  input = input.substring(6);
  let binValue: string = '';
  let cont = 1;
  packet.usedBits = 6;
  if (packet.typeId === 4) {
    do {
      cont = parseInt(input[0]);
      binValue += input.substring(1, 5);
      input = input.substring(5);
      packet.usedBits += 5;
    } while (cont == 1)
    packet.value = bin2dec(binValue);
  } else {
    packet.lengthTypeId = input.substring(0, 1);
    packet.usedBits += 1;
    input = input.substring(1);
    if (packet.lengthTypeId == '1') {
      packet.subPackageCount = bin2dec(input.substring(0, rules.lengthType[packet.lengthTypeId].length));
      input = input.substring(rules.lengthType[packet.lengthTypeId].length);
      packet.usedBits += rules.lengthType[packet.lengthTypeId].length;
      while (packet.subPackages.length < packet.subPackageCount) {
        if (packet.subPackages == undefined) {
          packet.subPackages = [];
        }
        let subPackage = readPackage(input);
        packet.subPackages.push(subPackage);
        packet.usedBits += subPackage.usedBits;
        input = input.substring(subPackage.usedBits);
      }
    } else {
      packet.subPackageLength = bin2dec(input.substring(0, rules.lengthType[packet.lengthTypeId].length));
      input = input.substring(rules.lengthType[packet.lengthTypeId].length);
      packet.usedBits += rules.lengthType[packet.lengthTypeId].length;
      let usedBits = 0;
      while (usedBits < packet.subPackageLength) {
        let subPackage = readPackage(input);
        packet.subPackages.push(subPackage);
        packet.usedBits += subPackage.usedBits;
        input = input.substring(subPackage.usedBits);
        usedBits += subPackage.usedBits;
      }
    }
  }
  return packet;
}

const versionSum = (p: Package): number => {
  let sum = p.version;
  p.subPackages.forEach(sp => {
    sum += versionSum(sp);
  });
  return sum;
}
  let input = lines[0].split('').map(hex => hex2bin(hex)).join('');
let rootPacket = readPackage(input);
console.log(versionSum(rootPacket));



