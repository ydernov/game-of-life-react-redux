import {
  createEntityAdapter,
  createSlice,
  Dictionary,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { newGenerationThunk } from "./appSettings";
import {
  calculateNewGeneration,
  generateField,
  populateCells,
} from "./fieldUtils";
import { RootState } from "./store";

export type Cell = 0 | 1 | 2;
//newborn: boolean;

export type Field = {
  cells: Cell[][];
  alive: number;
  newborn: number;
  xCellCount: number;
  yCellCount: number;
  cellSize: number;
  wrapField: false;
};

const initialState: Field = {
  cells: [],
  alive: 0,
  newborn: 0,
  xCellCount: 0,
  yCellCount: 0,
  cellSize: 5,
  wrapField: false,
};

export const fieldSlice = createSlice({
  name: "Field",
  initialState: initialState,

  reducers: {
    changeFieldSize: (
      state,
      { payload }: PayloadAction<{ xCellCount: number; yCellCount: number }>
    ) => {
      state.xCellCount = payload.xCellCount;
      state.yCellCount = payload.yCellCount;
    },

    //// changeCellState: (state, { payload }: PayloadAction<Update<Cell>>) => {
    //   cellsAdapter.updateOne(state.cells, payload);
    //   state.newborn += payload.changes.newborn ? 1 : -1;
    //   state.alive += payload.changes.state ? 1 : -1;
    // },

    generateFieldCells: (state) => {
      state.cells = generateField({
        xCellCount: state.xCellCount,
        yCellCount: state.yCellCount,
        cellSize: state.cellSize,
        wrapField: state.wrapField,
      });
    },

    populateFieldCells: (
      state,
      { payload = false }: PayloadAction<boolean>
    ) => {
      const { cells, alive } = populateCells(state.cells, payload);
      state.alive = alive;
      state.newborn = payload ? 0 : alive;
      state.cells = cells;
    },

    newgen: (state) => {
      const { cells, aliveCount, newbornCount } = calculateNewGeneration(
        state.cells
      );
      state.cells = cells;
      state.alive = aliveCount;
      state.newborn = newbornCount;
    },
  },

  extraReducers: (builder) => {
    let t1: number;
    let t2: number;
    builder.addCase(newGenerationThunk.pending, () => {
      t1 = performance.now();
    });
    builder.addCase(newGenerationThunk.fulfilled, (state, action) => {
      t2 = performance.now();
      state.cells = action.payload.cells;
      state.newborn = action.payload.newbornCount;
      state.alive = action.payload.aliveCount;

      // console.log("newGenerationThunk.fulfilled", t2 - t1);
    });

    // builder.addMatcher(
    //   (action) => action.type === changeFieldSize.type,
    //   fieldSlice.caseReducers.generateFieldCells
    // );
  },
});

// const fieldCellsSelector = cellsAdapter.getSelectors<RootState>(
//   (state) => state.field.cells
// );

export const {
  //changeCellState,

  generateFieldCells,
  populateFieldCells,
  changeFieldSize,
  newgen,
} = fieldSlice.actions;
//export { fieldCellsSelector };

export default fieldSlice.reducer;
