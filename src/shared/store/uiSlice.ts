import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  selectedBlockId: string | null;
  isCapturingShortcut: boolean;
}

const initialState: UiState = {
  selectedBlockId: null,
  isCapturingShortcut: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectBlock(state, action: PayloadAction<string>) {
      state.selectedBlockId = action.payload;
    },
    clearSelection(state) {
      state.selectedBlockId = null;
    },
    startCapture(state) {
      state.isCapturingShortcut = true;
    },
    stopCapture(state) {
      state.isCapturingShortcut = false;
    },
  },
});

export const { selectBlock, clearSelection, startCapture, stopCapture } = uiSlice.actions;
export default uiSlice.reducer;
