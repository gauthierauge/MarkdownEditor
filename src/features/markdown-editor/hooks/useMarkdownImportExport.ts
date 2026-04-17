import React, { useCallback, useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { saveFileContent, openFile } from '@/shared/store/markdownSlice';
import { importFileNode } from '@/shared/store/foldersSlice';

export function useMarkdownExport() {
    const openFileId = useAppSelector((s) => s.markdown.openFileId);
    const fileName = useAppSelector((s) => s.markdown.openFileName ?? 'document.md');
    const content = useAppSelector((s) =>
        openFileId != null ? (s.markdown.files[openFileId] ?? '') : ''
    );

    const handleExport = useCallback(() => {
        const name = fileName.endsWith('.md') ? fileName : `${fileName}.md`;
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
    }, [content, fileName]);

    return { handleExport };
}

export function useMarkdownImport() {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const id = nanoid();
            const name = file.name;
            const reader = new FileReader();
            reader.onload = () => {
                const text = reader.result as string;
                dispatch(importFileNode({ parentId: null, name, id }));
                dispatch(saveFileContent({ id, content: text }));
                dispatch(openFile({ id, name }));
            };
            reader.readAsText(file);
            e.target.value = '';
        },
        [dispatch]
    );

    return { handleImportClick, handleFileChange, inputRef };
}
