import { useCallback } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { selectOpenFileId, selectOpenFileName, selectFileContent } from '@/shared/store/markdownSlice';
import { downloadFile } from '@/shared/lib/downloadFile';

export function useMarkdownExport() {
    const openFileId = useAppSelector(selectOpenFileId);
    const fileName = useAppSelector(selectOpenFileName) ?? 'document.md';
    const content = useAppSelector((state) =>
        openFileId != null ? selectFileContent(state, openFileId) : ''
    );

    const handleExport = useCallback(() => {
        const name = fileName.endsWith('.md') ? fileName : `${fileName}.md`;
        downloadFile(name, content, 'text/markdown');
    }, [content, fileName]);

    return { handleExport };
}
