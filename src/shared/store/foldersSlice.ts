import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FileNode } from '@/features/file-tree/types/FileTree.types';
import {
    createFolderNode,
    moveNode,
    removeNode,
    renameNode,
    insertIntoFolder,
} from './folderTree.utils';

const initialTree: FileNode[] = [
    {
        id: '1',
        name: 'src',
        type: 'folder',
        children: [
            {
                id: '2',
                name: 'components',
                type: 'folder',
                children: [
                    { id: '3', name: 'Header.tsx', type: 'file' },
                    { id: '4', name: 'Footer.tsx', type: 'file' },
                ],
            },
            {
                id: '5',
                name: 'utils',
                type: 'folder',
                children: [
                    { id: '6', name: 'helpers.ts', type: 'file' },
                    { id: '7', name: 'constants.ts', type: 'file' },
                ],
            },
            { id: '8', name: 'App.tsx', type: 'file' },
            { id: '9', name: 'main.tsx', type: 'file' },
        ],
    },
    {
        id: '10',
        name: 'public',
        type: 'folder',
        children: [
            { id: '11', name: 'favicon.ico', type: 'file' },
            { id: '12', name: 'logo.png', type: 'file' },
        ],
    },
    { id: '13', name: 'package.json', type: 'file' },
    { id: '14', name: 'README.md', type: 'file' },
];

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
        createFolder(state, action: PayloadAction<{ parentId: string | null; name: string }>) {
            const { parentId, name } = action.payload;
            const node = createFolderNode(name);
            state.tree = insertIntoFolder(state.tree, parentId, node);
        },
        deleteFolder(state, action: PayloadAction<string>) {
            state.tree = removeNode(state.tree, action.payload);
        },
        renameFolder(state, action: PayloadAction<{ id: string; name: string }>) {
            const { id, name } = action.payload;
            if (name.trim()) state.tree = renameNode(state.tree, id, name.trim());
        },
        moveFolder(state, action: PayloadAction<{ nodeId: string; targetFolderId: string | null }>) {
            const { nodeId, targetFolderId } = action.payload;
            state.tree = moveNode(state.tree, nodeId, targetFolderId);
        },
    },
});

export const { createFolder, deleteFolder, renameFolder, moveFolder } = foldersSlice.actions;
export default foldersSlice.reducer;
