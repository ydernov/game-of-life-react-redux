import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";

import { Cell, Field, fieldSlice } from "./field";
import { calculateNewGeneration } from "./fieldUtils";
import { RootState } from "./store";

export type AppSettings = {
  availableFieldSize: {
    width: number;
    height: number;
  };
  generationNumber: number;
  paused: boolean;
  useWorker: boolean;
};

const initialState: AppSettings = {
  availableFieldSize: {
    width: 0,
    height: 0,
  },
  generationNumber: 0,
  paused: true,
  useWorker: false,
};

const worker = new Worker(new URL("./worker.ts", import.meta.url));

export const newGenerationThunk = createAsyncThunk<
  ReturnType<typeof calculateNewGeneration>,
  undefined,
  { state: RootState }
>("sometane", (_, { getState }) => {
  const {
    appSettings: { useWorker },
    field: { cells },
  } = getState();

  const t1 = performance.now();

  if (useWorker) {
    return new Promise<ReturnType<typeof calculateNewGeneration>>((resolve) => {
      worker.onmessage = (
        message: MessageEvent<{
          aliveCount: number;
          newbornCount: number;
          buffs: Int8Array[];
        }>
      ) => {
        const t2 = performance.now();
        // console.log(t2 - t1, "thunk to onmessage timeframe");

        const newCells: Cell[][] = [];

        message.data.buffs.forEach((row) => {
          newCells.push(Array.from(row) as Cell[]);
          // @ts-ignore
          row = null;
        });

        // const newCells = message.data.buffs as unknown as Cell[][];

        // message.data.buffs.forEach((val) => {
        //   const view = new Int8Array(val);
        //   const viewArr = Array.from(view) as Cell[];
        //   newCells.push(viewArr);
        // });

        resolve({
          aliveCount: message.data.aliveCount,
          newbornCount: message.data.newbornCount,
          cells: newCells,
        });

        // resolve({ cells, aliveCount: 0, newbornCount: 0 });
      };

      const views: Int8Array[] = [];
      const buffs: ArrayBufferLike[] = [];

      for (let index = 0; index < cells.length; index++) {
        const row = cells[index];
        // const buffer = new ArrayBuffer(4 * row.length);
        const view = new Int8Array(row);
        //view.set(row);
        buffs.push(view.buffer);
        views.push(view);
      }

      worker.postMessage(views, buffs);
    });
  } else {
    return calculateNewGeneration(cells);
  }
});

// const converter = (cells: Cell[][]) => {
//   const states: (0 | 1)[] = [];
//   const newborn: (0 | 1)[] = [];

//   cells.forEach(cell => {
//     states.push(cell[0])
//     newborn.push(cell[1])
//   });
// };

export const appSettingsSlice = createSlice({
  name: "Field",
  initialState,
  reducers: {
    changeAvailableSize: (
      state,
      { payload }: PayloadAction<{ width: number; height: number }>
    ) => {
      state.availableFieldSize = payload;
    },

    changePaused: (state, { payload }: PayloadAction<boolean>) => {
      state.paused = payload;
    },

    changeUseWorker: (state, { payload }: PayloadAction<boolean>) => {
      state.useWorker = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(newGenerationThunk.fulfilled, (state, action) => {
      state.generationNumber += 1;
    });

    builder.addCase(fieldSlice.actions.populateFieldCells, (state) => {
      state.generationNumber = 0;
    });
  },
});

export const { changeAvailableSize, changePaused, changeUseWorker } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;
