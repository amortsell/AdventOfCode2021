export class Point {
  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
    this.directions = [];
  }
  i: number;
  j: number;
  directions: number[];
}