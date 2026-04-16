import { useAppDispatch } from '@/store/hooks'
import { createFolder, deleteFolder, renameFolder, moveFolder } from '@/store/foldersSlice'

export function useFolderCrud() {
    const dispatch = useAppDispatch()

    return {
        onCreate: (parentId: string | null, name: string) =>
            dispatch(createFolder({ parentId, name })),
        onDelete: (id: string) => dispatch(deleteFolder(id)),
        onRename: (id: string, name: string) => dispatch(renameFolder({ id, name })),
        onMove: (nodeId: string, targetFolderId: string | null) =>
            dispatch(moveFolder({ nodeId, targetFolderId })),
    }
}
