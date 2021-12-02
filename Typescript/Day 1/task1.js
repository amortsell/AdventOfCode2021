"use strict";
/// <reference path="./node_modules/@types\\node/fs.d.ts" />
/// <reference path="./node_modules/@types\\node/fs/promises.d.ts" />
exports.__esModule = true;
var fs = require("fs");
var fsp = fs.promises;
var lines = fsp.readFile('Day 1/input.txt').then(function (text) { return text.toString('utf8').split('\n'); });
console.log(lines);
