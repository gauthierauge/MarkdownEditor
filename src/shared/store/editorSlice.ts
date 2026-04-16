import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

export const DEFAULT_FILE_ID = 'welcome'

export type EditorFile = {
  id: string
  content: string
  cursorPosition: number
  selectionStart: number
  selectionEnd: number
  updatedAt: string
}

interface EditorState {
  currentFileId: string
  files: Record<string, EditorFile>
}

function buildDefaultFileContent(fileId: string) {
  return `# ${fileId}\n\nBienvenue dans le fichier \`${fileId}\`.\n\n- Le bloc 3 peut deja y inserer des images en Markdown.\n- Le contenu reste simple en attendant l’integration complete du bloc editeur.\n`
}

function createEditorFile(fileId: string): EditorFile {
  const content = buildDefaultFileContent(fileId)

  return {
    id: fileId,
    content,
    cursorPosition: content.length,
    selectionStart: content.length,
    selectionEnd: content.length,
    updatedAt: new Date().toISOString(),
  }
}

function ensureFile(state: EditorState, fileId: string) {
  if (!state.files[fileId]) {
    state.files[fileId] = createEditorFile(fileId)
  }

  return state.files[fileId]
}

const initialState: EditorState = {
  currentFileId: DEFAULT_FILE_ID,
  files: {
    [DEFAULT_FILE_ID]: createEditorFile(DEFAULT_FILE_ID),
  },
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    openFile(state, action: PayloadAction<string>) {
      const fileId = action.payload.trim() || DEFAULT_FILE_ID
      state.currentFileId = fileId
      ensureFile(state, fileId)
    },
    setContent(state, action: PayloadAction<string>) {
      const file = ensureFile(state, state.currentFileId)
      file.content = action.payload
      file.updatedAt = new Date().toISOString()
    },
    setCursorPosition(state, action: PayloadAction<number>) {
      const file = ensureFile(state, state.currentFileId)
      const nextPosition = Math.max(0, Math.min(action.payload, file.content.length))

      file.cursorPosition = nextPosition
      file.selectionStart = nextPosition
      file.selectionEnd = nextPosition
    },
    setSelection(
      state,
      action: PayloadAction<{ selectionEnd: number; selectionStart: number }>,
    ) {
      const file = ensureFile(state, state.currentFileId)
      const start = Math.max(
        0,
        Math.min(action.payload.selectionStart, file.content.length),
      )
      const end = Math.max(0, Math.min(action.payload.selectionEnd, file.content.length))

      file.selectionStart = start
      file.selectionEnd = end
      file.cursorPosition = end
    },
    insertAtCursor(state, action: PayloadAction<string>) {
      const file = ensureFile(state, state.currentFileId)
      const start = Math.max(0, Math.min(file.selectionStart, file.content.length))
      const end = Math.max(start, Math.min(file.selectionEnd, file.content.length))
      const text = action.payload

      file.content = file.content.slice(0, start) + text + file.content.slice(end)

      const nextPosition = start + text.length
      file.cursorPosition = nextPosition
      file.selectionStart = nextPosition
      file.selectionEnd = nextPosition
      file.updatedAt = new Date().toISOString()
    },
  },
})

export const { insertAtCursor, openFile, setContent, setCursorPosition, setSelection } =
  editorSlice.actions

export const selectCurrentFileId = (state: RootState) => state.editor.currentFileId
export const selectCurrentFile = (state: RootState) =>
  state.editor.files[state.editor.currentFileId]
export const selectFileById = (state: RootState, fileId: string) =>
  state.editor.files[fileId]
export const selectCurrentContent = (state: RootState) =>
  selectCurrentFile(state)?.content ?? ''
export const selectCurrentCursorPosition = (state: RootState) =>
  selectCurrentFile(state)?.cursorPosition ?? 0

export default editorSlice.reducer
