import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export interface Block {
  id: string
  name: string
  content: string
  shortcut: string | null
}

interface BlocksState {
  blocks: Block[]
}

const initialState: BlocksState = {
  blocks: [],
}

const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    addBlock: {
      reducer(state, action: PayloadAction<Block>) {
        state.blocks.push(action.payload)
      },
      prepare(name: string, content = '', shortcut: string | null = null) {
        return { payload: { id: nanoid(), name, content, shortcut } }
      },
    },

    updateBlock(state, action: PayloadAction<{ id: string; content: string }>) {
      const block = state.blocks.find((b) => b.id === action.payload.id)
      if (block) block.content = action.payload.content
    },

    deleteBlock(state, action: PayloadAction<string>) {
      state.blocks = state.blocks.filter((b) => b.id !== action.payload)
    },

    renameBlock(state, action: PayloadAction<{ id: string; name: string }>) {
      const block = state.blocks.find((b) => b.id === action.payload.id)
      if (block) block.name = action.payload.name
    },

    setShortcut(state, action: PayloadAction<{ id: string; shortcut: string | null }>) {
      const block = state.blocks.find((b) => b.id === action.payload.id)
      if (block) block.shortcut = action.payload.shortcut
    },

    // Merge des blocs importés : regénère l'ID si un conflit existe déjà dans le state
    importBlocks(state, action: PayloadAction<Block[]>) {
      const existingIds = new Set(state.blocks.map((b) => b.id))
      for (const block of action.payload) {
        const newBlock = existingIds.has(block.id)
          ? { ...block, id: nanoid() }
          : block
        state.blocks.push(newBlock)
        existingIds.add(newBlock.id)
      }
    },
  },
})

export const { addBlock, updateBlock, deleteBlock, renameBlock, setShortcut, importBlocks } =
  blocksSlice.actions
export default blocksSlice.reducer
