import { Cell } from "./field";

const casesMap: {
  [key in Cell]: {
    [c: number]: Cell;
  };
} = {
  0: {
    0: 0,
    1: 0,
    2: 0,
    3: 2,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  },
  1: {
    0: 0,
    1: 0,
    2: 1,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  },
  2: {
    0: 0,
    1: 0,
    2: 1,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  },
};

const deadAliveMap: {
  [key in Cell]: 0 | 1;
} = {
  0: 0,
  1: 1,
  2: 1,
};

const getNewStateFromNeighbours = (
  cellState: Cell,
  cells: Cell[][],
  xCellCount: number,
  yCellCount: number,
  xIndex: number,
  yIndex: number
) => {
  const topRow = yIndex === 0 ? yCellCount - 1 : yIndex - 1;
  const bottomRow = yIndex + 1 === yCellCount ? 0 : yIndex + 1;
  const leftColumn = xIndex === 0 ? xCellCount - 1 : xIndex - 1;
  const rightColumn = xIndex + 1 === xCellCount ? 0 : xIndex + 1;

  const topLeft = cells[topRow][leftColumn];
  const top = cells[topRow][xIndex];
  const topRight = cells[topRow][rightColumn];

  const left = cells[yIndex][leftColumn];
  const right = cells[yIndex][rightColumn];

  const bottomLeft = cells[bottomRow][leftColumn];
  const bottom = cells[bottomRow][xIndex];
  const bottomRight = cells[bottomRow][rightColumn];

  return newGenCell(
    cellState,
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight
  );
};

const calculateNewGeneration = (
  cells: Cell[][]
): { cells: Cell[][]; aliveCount: number; newbornCount: number } => {
  let aliveCount = 0;
  let newbornCount = 0;

  const t1 = performance.now();

  const yCellCount = cells.length;
  const xCellCount = cells[0].length;

  const resultMatrix: Cell[][] = [];

  for (let yIndex = 0; yIndex < yCellCount; yIndex++) {
    const row = cells[yIndex];
    const resRow: Cell[] = [];

    for (let xIndex = 0; xIndex < row.length; xIndex++) {
      const cell = row[xIndex];

      const newState = getNewStateFromNeighbours(
        cell,
        cells,
        xCellCount,
        yCellCount,
        xIndex,
        yIndex
      );

      const newborn = newState === 2 && cell === 0 ? 1 : 0;

      aliveCount = aliveCount + newState ? 1 : 0;
      newbornCount = newbornCount + newborn;

      if (cell === newState) {
        resRow.push(cell);
      } else {
        resRow.push(newState);
      }

      // const newCell: Cell = {
      //   state: newState,
      //   newborn,
      // };

      // resRow.push(newCell);
    }

    resultMatrix.push(resRow);
  }

  const t2 = performance.now();

  // console.log("calculateNewGeneration", t2 - t1);

  return { cells: resultMatrix, newbornCount, aliveCount };
};

const populateCells = (
  cells: Cell[][],
  clear: boolean
): { cells: Cell[][]; alive: number } => {
  const resultArray: Cell[][] = [];
  let aliveNumber = 0;

  for (const row of cells) {
    const resultRow: Cell[] = [];
    for (const cell of row) {
      const newState = clear || Math.random() < 0.8 ? 0 : 2;
      aliveNumber = aliveNumber + newState ? 1 : 0;

      resultRow.push(newState);
    }

    resultArray.push(resultRow);
  }

  return { cells: resultArray, alive: aliveNumber };
};

export const newGenCell = (
  cellState: Cell,
  topLeft: Cell,
  top: Cell,
  topRight: Cell,
  left: Cell,
  right: Cell,
  bottomLeft: Cell,
  bottom: Cell,
  bottomRight: Cell
) => {
  const aliveCount =
    deadAliveMap[topLeft] +
    deadAliveMap[top] +
    deadAliveMap[topRight] +
    deadAliveMap[left] +
    deadAliveMap[right] +
    deadAliveMap[bottomLeft] +
    deadAliveMap[bottom] +
    deadAliveMap[bottomRight];

  // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.

  // if (cellState === 0) {
  //   if (aliveNeighboursCount === 3) {
  //     return 2;
  //   }
  // } else {
  //   if (aliveNeighboursCount === 2 || aliveNeighboursCount === 3) {
  //     return 1;
  //   }
  // }

  // return cellState === 0
  //   ? aliveNeighboursCount === 3
  //     ? 2
  //     : 0
  //   : aliveNeighboursCount === 2 || aliveNeighboursCount === 3
  //   ? 1
  //   : 0;

  return casesMap[cellState][aliveCount];

  // return aliveCount === 2 || aliveCount === 3
  //   ? cellState === 1
  //     ? 1
  //     : aliveCount === 3
  //     ? 1
  //     : 0
  //   : 0;
};

const generateField = ({
  xCellCount,
  yCellCount,
  cellSize,
  wrapField,
}: {
  xCellCount: number;
  yCellCount: number;
  cellSize: number;
  wrapField: boolean;
}): Cell[][] => {
  const arrLength = xCellCount * yCellCount;

  const resultArray: Cell[][] = [];

  for (let yIndex = 0; yIndex < yCellCount; yIndex++) {
    const row: Cell[] = [];

    for (let xIndex = 0; xIndex < xCellCount; xIndex++) {
      const cell: Cell = 0;

      row.push(cell);
    }

    resultArray.push(row);
  }

  return resultArray;
};

export { generateField, populateCells, calculateNewGeneration };
