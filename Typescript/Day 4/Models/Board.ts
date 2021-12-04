import { Cell } from './Cell';

export class Board {
    rows: Cell[][] = [];
    hasBingo(): boolean {
      let result = true;
      let i = 0;
      while (i < this.rows.length) {
        let j = 0;
        while (j < this.rows[i].length) {
          const cell = this.rows[i][j];
          if (cell.hit == false) {
            break;
          }
          j++;
        }
        if (j == 5) {
          return true;
        }
        i++;
      }

      i = 0;
      while (i < this.rows[0].length) {
        let j = 0;
        while (j < this.rows.length) {
          const cell = this.rows[j][i];
          if (cell.hit == false) {
            break;
          }
          j++;
        }
        if (j == 5) {
          return true;
        };
        i++;
      }

      return false;
    }

    equals(other: Board): boolean {
      let foundDifferent = false;
      this.rows.some((row: Cell[], rowIx) => {
        row.some((cell: Cell, colIx) => {
          if (other.rows[rowIx][colIx].hit !== cell.hit || other.rows[rowIx][colIx].value !== cell.value) {
            foundDifferent = true;
            return foundDifferent;
          }
        });
        return foundDifferent;
      });

      return !foundDifferent;
    }

    isLast(boards: Board[]): boolean {
      return boards.reduce((prev: boolean, curr: Board) => {
        if (curr.equals(this)) {
          return prev;
        } else {
          return prev && curr.hasBingo();
        }
      }, true as boolean);
    }

    hitCell(value: number): void {
      this.rows.forEach(row => {
        row.forEach(cell => {
          if (cell.value == value) {
            cell.hit = true;
            return;
          }
        });
      });
    }

    countUnmarked(): number {
      const result = this.rows.reduce((prev: number, row: Cell[]) => {
        return prev + row.reduce((innerPrev: number, cell: Cell) => {
          const result = cell.hit ? 0 : cell.value;
          return innerPrev + result;
        }, 0 as number);
      }, 0 as number);
      return result;
    }

    isEmpty(): boolean{
      return this.rows.length == 0;
    }
}