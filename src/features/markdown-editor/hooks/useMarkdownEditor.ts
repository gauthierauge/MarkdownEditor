import { useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { saveFileContent, closeFile } from '@/shared/store/markdownSlice';

const AUTOSAVE_DELAY_MS = 600;

export function useMarkdownEditor() {
    const dispatch = useAppDispatch();
    const openFileId = useAppSelector((s) => s.markdown.openFileId);
    const openFileName = useAppSelector((s) => s.markdown.openFileName);
    const savedContent = useAppSelector((s) =>
        openFileId != null ? (s.markdown.files[openFileId] ?? '') : ''
    );

    const [draft, setDraft] = useState({ fileId: openFileId, content: savedContent });
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    if (draft.fileId !== openFileId) {
        setDraft({ fileId: openFileId, content: savedContent });
    }

    const content = draft.content;

    const handleChange = useCallback(
        (value: string) => {
            setDraft((prev) => ({ ...prev, content: value }));
            if (timerRef.current) clearTimeout(timerRef.current);
            if (openFileId == null) return;
            timerRef.current = setTimeout(() => {
                dispatch(saveFileContent({ id: openFileId, content: value }));
            }, AUTOSAVE_DELAY_MS);
        },
        [dispatch, openFileId]
    );

    const handleClose = useCallback(() => {
        if (openFileId != null) {
            dispatch(saveFileContent({ id: openFileId, content: draft.content }));
        }
        dispatch(closeFile());
    }, [dispatch, openFileId, draft.content]);

    return { openFileId, openFileName, content, handleChange, handleClose };
}
