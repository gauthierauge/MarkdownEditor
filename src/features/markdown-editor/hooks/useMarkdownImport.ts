import React, { useCallback, useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/shared/store/hooks';
import { saveFileContent, openFile } from '@/shared/store/slices/markdownSlice';
import { importFileNode } from '@/shared/store/slices/foldersSlice';
import { readFileAsText } from '@/features/markdown-editor/services/markdown.service';

export function useMarkdownImport() {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const id = nanoid();
            const name = file.name;
            const text = await readFileAsText(file);
            dispatch(importFileNode({ parentId: null, name, id }));
            dispatch(saveFileContent({ id, content: text }));
            dispatch(openFile({ id, name }));
            e.target.value = '';
        },
        [dispatch]
    );

    return { handleImportClick, handleFileChange, inputRef };
}
