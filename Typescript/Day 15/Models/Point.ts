export class Point {
  constructor(risk: number) {
    this.risk = risk;
    this.cost = Math.pow(2,64);
    this.visited = false;
  }
  risk: number;
  cost: number;
  visited: boolean;
}