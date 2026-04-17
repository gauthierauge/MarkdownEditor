import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FileNode } from '@/features/file-tree/types/FileTree.types';
import type { RootState } from '../index';
import {
    createFolderNode,
    createFileNode,
    moveNode as treeMove,
    removeNode as treeRemove,
    renameNode as treeRename,
    insertIntoFolder,
} from '@/features/file-tree/services/tree.service';
import { initialTree } from '@/features/file-tree/data/initialTree';

interface FoldersState {
    tree: FileNode[];
}

const initialState: FoldersState = {
    tree: initialTree,
};

const foldersSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        deleteNode(state, action: PayloadAction<string>) {
            state.tree = treeRemove(state.tree, action.payload);
        },
        renameNode(state, action: PayloadAction<{ id: string; name: string }>) {
            const { id, name } = action.payload;
            if (name.trim()) state.tree = treeRename(state.tree, id, name.trim());
        },
        moveNode(state, action: PayloadAction<{ nodeId: string; targetFolderId: string | null }>) {
            const { nodeId, targetFolderId } = action.payload;
            state.tree = treeMove(state.tree, nodeId, targetFolderId);
        },
        createFolder(state, action: PayloadAction<{ parentId: string | null; name: string }>) {
            const { parentId, name } = action.payload;
            state.tree = insertIntoFolder(state.tree, parentId, createFolderNode(name));
        },
        createFile(state, action: PayloadAction<{ parentId: string | null; name: string }>) {
            const { parentId, name } = action.payload;
            state.tree = insertIntoFolder(state.tree, parentId, createFileNode(name));
        },
        importFileNode(state, action: PayloadAction<{ parentId: string | null; name: string; id: string }>) {
            const { parentId, name, id } = action.payload;
            state.tree = insertIntoFolder(state.tree, parentId, { id, name, type: 'file' });
        },
    },
});

export const {
    deleteNode,
    renameNode,
    moveNode,
    createFolder,
    createFile,
    importFileNode,
} = foldersSlice.actions;
export default foldersSlice.reducer;

export const selectFileTree = (state: RootState) => state.folders.tree;
