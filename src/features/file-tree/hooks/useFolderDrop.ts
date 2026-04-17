import { useDropzone } from 'react-dropzone';
import { useDragContext } from './useDragContext';
import { useAppSelector } from '@/shared/store/hooks';
import { selectFileTree } from '@/shared/store/foldersSlice';
import { isAncestor } from '@/shared/store/folderTree.utils';

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
