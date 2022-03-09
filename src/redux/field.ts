import {
  createEntityAdapter,
  createSlice,
  Dictionary,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { newGenerationThunk } from "./appSettings";
import { RootState } from "./store";

const cellsAdapter = createEntityAdapter<Cell>({});

export type Cell = {
  id: string;
  top: number;
  left: number;

  state: boolean;
  newborn: boolean;

  neighbours: {
    left: Cell["id"] | null;
    right: Cell["id"] | null;
    top: Cell["id"] | null;
    bottom: Cell["id"] | null;
    topLeft: Cell["id"] | null;
    topRight: Cell["id"] | null;
    bottomLeft: Cell["id"] | null;
    bottomRight: Cell["id"] | null;
  };
};

export type Field = {
  cells: { [key in Cell["id"]]: Cell };
};

const findTopIndex = (xCellCount: number, currentIndex: number) => {
  return currentIndex - xCellCount;
};

const findTopLeftIndex = (
  xCellCount: number,
  yCellCount: number,
  currentIndex: number
) => {
  return findTopIndex(xCellCount, currentIndex) - 1;
};

const findTopRightIndex = (
  xCellCount: number,
  yCellCount: number,
  currentIndex: number
) => {
  return findTopIndex(xCellCount, currentIndex) + 1;
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
}): Cell[] => {
  const arrLength = xCellCount * yCellCount;

  const resultArray: Cell[] = [];

  for (let yIndex = 0; yIndex < yCellCount; yIndex++) {
    for (let xIndex = 0; xIndex < xCellCount; xIndex++) {
      const currentIndex = yIndex * xCellCount + xIndex;
      const topLeftNbr =
        (yIndex !== 0 &&
          xIndex !== 0 &&
          resultArray[currentIndex - xCellCount - 1]) ||
        null;

      const topNbr =
        (yIndex !== 0 && resultArray[currentIndex - xCellCount]) || null;

      const topRightNbr =
        (yIndex !== 0 && wrapField
          ? resultArray[currentIndex - xCellCount + 1]
          : xIndex < xCellCount - 1 &&
            resultArray[currentIndex - xCellCount + 1]) || null;

      const leftNbr =
        xIndex === 0
          ? null
          : resultArray[yIndex * xCellCount + xIndex - 1] || null;

      const rightNbr =
        (wrapField &&
          xIndex === xCellCount - 1 &&
          resultArray[yIndex * xCellCount]) ||
        null;

      const bottomLeftNbr =
        (wrapField && yIndex === yCellCount - 1 && resultArray[xIndex - 1]) ||
        null;

      const bottomNbr =
        (wrapField && yIndex === yCellCount - 1 && resultArray[xIndex]) || null;

      const bottomRightNbr =
        (wrapField &&
          yIndex === yCellCount - 1 &&
          (xIndex < xCellCount - 1
            ? resultArray[xIndex + 1]
            : resultArray[0])) ||
        null;

      const cell: Cell = {
        id: uuidv4(),
        top: yIndex * cellSize,
        left: xIndex * cellSize,
        state: false,
        newborn: false,

        neighbours: {
          top: topNbr?.id || null,
          left: leftNbr?.id || null,
          topLeft: topLeftNbr?.id || null,
          topRight: topRightNbr?.id || null,

          right: null,
          bottom: null,

          bottomLeft: null,
          bottomRight: null,
        },
      };

      resultArray.push(cell);

      if (topNbr) {
        topNbr.neighbours.bottom = cell.id;
      }

      if (leftNbr) {
        leftNbr.neighbours.right = cell.id;
      }

      if (topLeftNbr) {
        topLeftNbr.neighbours.bottomRight = cell.id;
      }

      if (topRightNbr) {
        topRightNbr.neighbours.bottomLeft = cell.id;
      }

      if (rightNbr) {
        rightNbr.neighbours.left = cell.id;
      }

      if (bottomLeftNbr) {
        bottomLeftNbr.neighbours.topRight = cell.id;
      }

      if (bottomNbr) {
        bottomNbr.neighbours.top = cell.id;
      }

      if (bottomRightNbr) {
        bottomRightNbr.neighbours.topLeft = cell.id;
      }
    }
  }

  if (resultArray.length !== arrLength) {
    throw new Error("Expected cell count was not met!");
  }

  return resultArray;
};

const populateCells = (
  cells: Dictionary<Cell>,
  clear: boolean
): { cells: Update<Cell>[]; alive: number } => {
  const updates: Update<Cell>[] = [];
  let aliveNumber = 0;

  for (const cellId in cells) {
    const cell = cells[cellId];

    if (cell) {
      const alive = clear ? false : Math.random() > 0.8;
      aliveNumber += alive ? 1 : 0;
      const updateCell: Update<Cell> = {
        id: cell.id,
        changes: { state: alive, newborn: alive },
      };

      updates.push(updateCell);
    }
  }

  return { cells: updates, alive: aliveNumber };
};

export const newGenCell = (
  cellState: boolean,
  neighbours: [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
  ]
) => {
  const aliveNeighboursCount = neighbours.filter((nb) => nb === true).length;
  // Any live cell with two or three live neighbours survives.
  // Any dead cell with three live neighbours becomes a live cell.
  // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  return cellState
    ? aliveNeighboursCount === 2 || aliveNeighboursCount === 3
      ? true
      : false
    : aliveNeighboursCount === 3
    ? true
    : false;
};

export const calculateNewGeneration = (
  cells: Dictionary<Cell>
): { cells: Update<Cell>[]; alive: number; newborn: number } => {
  const updates: Update<Cell>[] = [];
  let alive = 0;
  let newborn = 0;

  for (const cellId in cells) {
    const cell = cells[cellId];

    if (!cell) continue;

    const topLeft = cell.neighbours.topLeft
      ? cells[cell.neighbours.topLeft]?.state || false
      : false;

    const top = cell.neighbours.top
      ? cells[cell.neighbours.top]?.state || false
      : false;

    const topRight = cell.neighbours.topRight
      ? cells[cell.neighbours.topRight]?.state || false
      : false;

    const left = cell.neighbours.left
      ? cells[cell.neighbours.left]?.state || false
      : false;

    const right = cell.neighbours.right
      ? cells[cell.neighbours.right]?.state || false
      : false;

    const bottomLeft = cell.neighbours.bottomLeft
      ? cells[cell.neighbours.bottomLeft]?.state || false
      : false;

    const bottom = cell.neighbours.bottom
      ? cells[cell.neighbours.bottom]?.state || false
      : false;

    const bottomRight = cell.neighbours.bottomRight
      ? cells[cell.neighbours.bottomRight]?.state || false
      : false;

    const newState = newGenCell(cell.state || false, [
      topLeft,
      top,
      topRight,
      left,
      right,
      bottomLeft,
      bottom,
      bottomRight,
    ]);

    const newNewborn = !cell.state && newState;

    const updateCell: Update<Cell> = {
      id: cell.id,
      changes: { state: newState, newborn: newNewborn },
    };

    alive += newState ? 1 : 0;
    newborn += newNewborn ? 1 : 0;

    if (cell.state !== newState || cell.newborn !== newNewborn)
      updates.push(updateCell);
  }

  return { cells: updates, newborn, alive };
};

export const fieldSlice = createSlice({
  name: "Field",
  initialState: {
    cells: cellsAdapter.getInitialState(),
    alive: 0,
    newborn: 0,
    xCellCount: 0,
    yCellCount: 0,
    cellSize: 10,
    wrapField: false,
  },

  reducers: {
    changeFieldSize: (
      state,
      { payload }: PayloadAction<{ xCellCount: number; yCellCount: number }>
    ) => {
      state.xCellCount = payload.xCellCount;
      state.yCellCount = payload.yCellCount;
    },

    changeCellState: (state, { payload }: PayloadAction<Update<Cell>>) => {
      cellsAdapter.updateOne(state.cells, payload);
      state.newborn += payload.changes.newborn ? 1 : -1;
      state.alive += payload.changes.state ? 1 : -1;
    },

    generateFieldCells: ({
      cells,
      xCellCount,
      yCellCount,
      cellSize,
      wrapField,
    }) => {
      cellsAdapter.setAll(
        cells,
        generateField({ xCellCount, yCellCount, cellSize, wrapField })
      );
    },

    populateFieldCells: (
      state,
      { payload = false }: PayloadAction<boolean>
    ) => {
      const { cells, alive } = populateCells(state.cells.entities, payload);
      cellsAdapter.updateMany(state.cells, cells);

      state.alive = alive;
      state.newborn = payload ? 0 : alive;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(newGenerationThunk.fulfilled, (state, action) => {
      cellsAdapter.updateMany(state.cells, action.payload.cells);

      state.newborn = action.payload.newborn;
      state.alive = action.payload.alive;
    });

    builder.addMatcher(
      (action) => action.type === changeFieldSize.type,
      fieldSlice.caseReducers.generateFieldCells
    );
  },
});

const fieldCellsSelector = cellsAdapter.getSelectors<RootState>(
  (state) => state.field.cells
);

export const {
  changeCellState,

  generateFieldCells,
  populateFieldCells,
  changeFieldSize,
} = fieldSlice.actions;
export { fieldCellsSelector };

export default fieldSlice.reducer;
