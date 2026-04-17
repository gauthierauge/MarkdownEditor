import { useRef, useCallback, type ReactNode } from 'react';
import { EditorInsertContext } from './EditorInsertContext';

type InsertFn = (text: string) => void;

export function EditorInsertProvider({ children }: { children: ReactNode }) {
  const fnRef = useRef<InsertFn | null>(null);

  const registerInsert = useCallback((fn: InsertFn | null) => {
    fnRef.current = fn;
  }, []);

  const insertText = useCallback((text: string) => {
    fnRef.current?.(text);
  }, []);

  return (
    <EditorInsertContext.Provider value={{ insertText, registerInsert }}>
      {children}
    </EditorInsertContext.Provider>
  );
}
