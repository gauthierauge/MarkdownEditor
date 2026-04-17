import { useState, useCallback, type DragEvent } from 'react';
import { useDragContext } from '@/shared/context/drag/useDragContext';
import { useAppSelector } from '@/shared/store/hooks';
import { selectFileTree } from '@/shared/store/slices/foldersSlice';
import { isAncestor } from '@/features/file-tree/services/tree.service';

interface UseFolderDropOptions {
    folderId: string | null;
    onMove: (nodeId: string, targetFolderId: string | null) => void;
}

export function useFolderDrop({ folderId, onMove }: UseFolderDropOptions) {
    const { getDraggedId, clearDragged } = useDragContext();
    const tree = useAppSelector(selectFileTree);
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDragOver = useCallback((e: DragEvent) => {
        if (!getDraggedId()) return;
        e.preventDefault();
        e.stopPropagation();
    }, [getDraggedId]);

    const handleDragEnter = useCallback((e: DragEvent) => {
        if (!getDraggedId()) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    }, [getDraggedId]);

    const handleDragLeave = useCallback((e: DragEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        const id = getDraggedId();
        if (!id) return;
        if (folderId !== null) {
            if (id === folderId) return;
            if (isAncestor(tree, id, folderId)) return;
        }
        onMove(id, folderId);
        clearDragged();
    }, [getDraggedId, folderId, tree, onMove, clearDragged]);

    const getRootProps = useCallback(() => ({
        onDragOver: handleDragOver,
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
    }), [handleDragOver, handleDragEnter, handleDragLeave, handleDrop]);

    return { getRootProps, isDragActive };
}
