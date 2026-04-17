import React, { useCallback, useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/shared/store/hooks';
import { saveFileContent, openFile } from '@/shared/store/markdownSlice';
import { importFileNode } from '@/shared/store/foldersSlice';

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
