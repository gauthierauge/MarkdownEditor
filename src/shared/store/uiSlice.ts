import { createSlice } from '@reduxjs/toolkit';

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

// Selectors
import type { RootState } from './index';

export const selectIsCapturingShortcut = (state: RootState) => state.ui.isCapturingShortcut;
