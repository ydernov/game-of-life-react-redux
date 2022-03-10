import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";

import { calculateNewGeneration, Field, Cell, fieldSlice } from "./field";
import { RootState } from "./store";

export type AppSettings = {
  availableFieldSize: {
    width: number;
    height: number;
  };
  generationNumber: number;
  paused: boolean;
};

const initialState: AppSettings = {
  availableFieldSize: {
    width: 0,
    height: 0,
  },
  generationNumber: 0,
  paused: true,
};

export const newGenerationThunk = createAsyncThunk<
  ReturnType<typeof calculateNewGeneration>,
  undefined,
  { state: RootState }
>("sometane", (_, { getState }) => {
  const {
    field: { cells },
  } = getState();

  return calculateNewGeneration(cells.entities);
});

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

export const { changeAvailableSize, changePaused } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
