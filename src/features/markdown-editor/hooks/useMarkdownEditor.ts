import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { saveFileContent, closeFile, selectOpenFileId, selectOpenFileName, selectFileContent } from '@/shared/store/markdownSlice';
import { selectAllBlocks } from '@/shared/store/blocksSlice';
import { useEditorInsert } from '@/shared/context/EditorInsertContext';
import type { Block } from '@/features/block-editor/types/block.types';

const AUTOSAVE_DELAY_MS = 600;

export function useMarkdownEditor() {
    const dispatch = useAppDispatch();
    const { registerInsert, insertText } = useEditorInsert();
    const openFileId = useAppSelector(selectOpenFileId);
    const openFileName = useAppSelector(selectOpenFileName);
    const savedContent = useAppSelector((state) =>
        openFileId != null ? selectFileContent(state, openFileId) : ''
    );
    const blocks = useAppSelector(selectAllBlocks);

    const [draft, setDraft] = useState<{ fileId: string | null; content: string }>({ fileId: openFileId, content: savedContent });
    const [showPreview, setShowPreview] = useState<boolean>(true);
    const [showBlockMenu, setShowBlockMenu] = useState<boolean>(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

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

    const contentRef = useRef(content);
    contentRef.current = content;

    const handleChangeRef = useRef(handleChange);
    handleChangeRef.current = handleChange;

    const insertIntoTextarea = useCallback((text: string) => {
        const ta = textareaRef.current;
        const pos = ta ? ta.selectionStart : contentRef.current.length;
        const before = contentRef.current.slice(0, pos);
        const after = contentRef.current.slice(pos);
        const newContent = before + text + after;
        handleChangeRef.current(newContent);

        if (ta) {
            const newPos = pos + text.length;
            requestAnimationFrame(() => {
                ta.setSelectionRange(newPos, newPos);
                ta.focus();
            });
        }
    }, []);

    useEffect(() => {
        registerInsert(insertIntoTextarea);
        return () => registerInsert(null);
    }, [registerInsert, insertIntoTextarea]);

    useEffect(() => {
        if (!showBlockMenu) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowBlockMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showBlockMenu]);

    const togglePreview = useCallback(() => setShowPreview((v) => !v), []);
    const toggleBlockMenu = useCallback(() => setShowBlockMenu((v) => !v), []);

    const handleInsertBlock = useCallback((block: Block) => {
        insertText(block.content);
        setShowBlockMenu(false);
    }, [insertText]);

    const handleClose = useCallback(() => {
        if (openFileId != null) {
            dispatch(saveFileContent({ id: openFileId, content: draft.content }));
        }
        dispatch(closeFile());
    }, [dispatch, openFileId, draft.content]);

    return {
        textareaRef,
        menuRef,
        openFileId,
        openFileName,
        content,
        blocks,
        showPreview,
        showBlockMenu,
        handleChange,
        handleClose,
        togglePreview,
        toggleBlockMenu,
        handleInsertBlock,
    };
}
