import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { saveFileContent, closeFile, selectOpenFileId, selectOpenFileName, selectFileContent } from '@/shared/store/markdownSlice';
import { useEditorInsert } from '@/shared/context/EditorInsertContext';
import { insertTextAt } from '@/features/markdown-editor/services/markdown.service';
import type { EditorDraft } from '@/features/markdown-editor/types/editor.types';
import {AUTOSAVE_DELAY_MS} from "@/features/markdown-editor/constants/editor.constants.ts";

export function useMarkdownEditor() {
    const dispatch = useAppDispatch();
    const { registerInsert } = useEditorInsert();
    const openFileId = useAppSelector(selectOpenFileId);
    const openFileName = useAppSelector(selectOpenFileName);
    const savedContent = useAppSelector((state) =>
        openFileId != null ? selectFileContent(state, openFileId) : ''
    );

    const [draft, setDraft] = useState<EditorDraft>({ fileId: openFileId, content: savedContent });
    const [showPreview, setShowPreview] = useState<boolean>(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const latestRef = useRef({ content: draft.content, handleChange: (_v: string) => {} });

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

    useEffect(() => {
        latestRef.current = { content, handleChange };
    });

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const insertIntoTextarea = useCallback((text: string) => {
        const ta = textareaRef.current;
        const { content: current, handleChange: onChange } = latestRef.current;
        const pos = ta ? ta.selectionStart : current.length;
        const result = insertTextAt(current, pos, text);
        onChange(result.content);

        if (ta) {
            requestAnimationFrame(() => {
                ta.setSelectionRange(result.cursorPosition, result.cursorPosition);
                ta.focus();
            });
        }
    }, []);

    useEffect(() => {
        registerInsert(insertIntoTextarea);
        return () => registerInsert(null);
    }, [registerInsert, insertIntoTextarea]);

    const togglePreview = useCallback(() => setShowPreview((v) => !v), []);

    const handleClose = useCallback(() => {
        if (openFileId != null) {
            dispatch(saveFileContent({ id: openFileId, content: draft.content }));
        }
        dispatch(closeFile());
    }, [dispatch, openFileId, draft.content]);

    return {
        textareaRef,
        openFileId,
        openFileName,
        content,
        showPreview,
        handleChange,
        handleClose,
        togglePreview,
    };
}
