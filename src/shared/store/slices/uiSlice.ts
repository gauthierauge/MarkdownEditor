import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UiState {
  isCapturingShortcut: boolean;
}

const initialState: UiState = {
  isCapturingShortcut: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startCapture(state) {
      state.isCapturingShortcut = true;
    },
    stopCapture(state) {
      state.isCapturingShortcut = false;
    },
  },
});

export const { startCapture, stopCapture } = uiSlice.actions;
export default uiSlice.reducer;

export const selectIsCapturingShortcut = (state: RootState) => state.ui.isCapturingShortcut;
