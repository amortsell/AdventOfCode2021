export class Cave {
  constructor(name: string) {
    this.connectedCaves = [];
    this.name = name;
  }
  name: string;
  connectedCaves: Cave[];
}