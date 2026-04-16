import { useAppDispatch } from '@/shared/store/hooks';
import { createFolder, deleteNode, renameNode, moveNode } from '@/shared/store/foldersSlice';

export function useFolderCrud() {
    const dispatch = useAppDispatch();

    return {
        onCreate: (parentId: string | null, name: string) =>
            dispatch(createFolder({ parentId, name })),
        onDelete: (id: string) => dispatch(deleteNode(id)),
        onRename: (id: string, name: string) => dispatch(renameNode({ id, name })),
        onMove: (nodeId: string, targetFolderId: string | null) =>
            dispatch(moveNode({ nodeId, targetFolderId })),
    };
}
