import { useDropzone } from 'react-dropzone';
import { useDragContext } from '@/shared/context/drag/useDragContext';
import { useAppSelector } from '@/shared/store/hooks';
import { selectFileTree } from '@/shared/store/slices/foldersSlice';
import { isAncestor } from '@/shared/store/slices/folderTree.utils';

interface UseFolderDropOptions {
    folderId: string;
    onMove: (nodeId: string, targetFolderId: string | null) => void;
}

export function useFolderDrop({ folderId, onMove }: UseFolderDropOptions) {
    const { getDraggedId, clearDragged } = useDragContext();
    const tree = useAppSelector(selectFileTree);

    const { getRootProps, isDragActive } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDrop: () => {
            const id = getDraggedId();
            if (!id || id === folderId) return;
            if (isAncestor(tree, id, folderId)) return;
            onMove(id, folderId);
            clearDragged();
        },
    });

    return { getRootProps, isDragActive };
}
