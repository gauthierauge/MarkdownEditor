import { useCallback } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { selectOpenFileId, selectOpenFileName, selectFileContent } from '@/shared/store/slices/markdownSlice';
import { downloadFile } from '@/shared/lib/downloadFile';
import { ensureMdExtension } from '@/features/markdown-editor/services/markdown.service';

export function useMarkdownExport() {
    const openFileId = useAppSelector(selectOpenFileId);
    const fileName = useAppSelector(selectOpenFileName) ?? 'document.md';
    const content = useAppSelector((state) =>
        openFileId != null ? selectFileContent(state, openFileId) : ''
    );

    const handleExport = useCallback(() => {
        downloadFile(ensureMdExtension(fileName), content, 'text/markdown');
    }, [content, fileName]);

    return { handleExport };
}
