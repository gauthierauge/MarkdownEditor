import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface EditorState {
  content: string
  cursorPosition: number
}

const initialState: EditorState = {
  content: '',
  cursorPosition: 0,
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload
    },

    setCursorPosition(state, action: PayloadAction<number>) {
      state.cursorPosition = action.payload
    },

    // Insère du texte à la position courante du curseur et avance la position
    insertAtCursor(state, action: PayloadAction<string>) {
      const { content, cursorPosition } = state
      const text = action.payload
      state.content =
        content.slice(0, cursorPosition) + text + content.slice(cursorPosition)
      state.cursorPosition = cursorPosition + text.length
    },
  },
})

export const { setContent, setCursorPosition, insertAtCursor } = editorSlice.actions
export default editorSlice.reducer
