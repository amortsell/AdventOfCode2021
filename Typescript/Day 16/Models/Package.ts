export class Package {
  constructor() {
    this.version = 0;
    this.typeId = 0;
    this.lengthTypeId = '';
    this.subPackages = [];
    this.usedBits = 0;
    this.value = 0;
  }
  version: number;
  typeId: number;
  lengthTypeId: string;
  subPackages: Package[];
  subPackageCount?: number;
  value: number;
  subPackageLength?: number;
  usedBits: number;
}