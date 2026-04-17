import { useAppDispatch } from '@/shared/store/hooks'
import {
    createFolder,
    createFile,
    deleteNode,
    renameNode,
    moveNode,
} from '@/shared/store/slices/foldersSlice'

export function useNodeCrud() {
    const dispatch = useAppDispatch()

    return {
        onCreateFolder: (parentId: string | null, name: string) =>
            dispatch(createFolder({ parentId, name })),
        onCreateFile: (parentId: string | null, name: string) =>
            dispatch(createFile({ parentId, name })),
        onDelete: (id: string) => dispatch(deleteNode(id)),
        onRename: (id: string, name: string) => dispatch(renameNode({ id, name })),
        onMove: (nodeId: string, targetFolderId: string | null) =>
            dispatch(moveNode({ nodeId, targetFolderId })),
    }
}
