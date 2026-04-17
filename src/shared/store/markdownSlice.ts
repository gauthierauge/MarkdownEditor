import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MarkdownState {
    openFileId: string | null;
    openFileName: string | null;
    files: Record<string, string>;
}

const initialState: MarkdownState = {
    openFileId: null,
    openFileName: null,
    files: {},
};

const markdownSlice = createSlice({
    name: 'markdown',
    initialState,
    reducers: {
        openFile(state, action: PayloadAction<{ id: string; name: string }>) {
            state.openFileId = action.payload.id;
            state.openFileName = action.payload.name;
            if (!(action.payload.id in state.files)) {
                state.files[action.payload.id] = '';
            }
        },
        closeFile(state) {
            state.openFileId = null;
            state.openFileName = null;
        },
        saveFileContent(state, action: PayloadAction<{ id: string; content: string }>) {
            state.files[action.payload.id] = action.payload.content;
        },
    },
});

export const { openFile, closeFile, saveFileContent } = markdownSlice.actions;
export default markdownSlice.reducer;
