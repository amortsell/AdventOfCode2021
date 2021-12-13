export class FoldPoint {
  constructor(dir: string, pos: number) {
    this.direction = dir;
    this.position = pos;
  }
  direction: string;
  position: number;
}