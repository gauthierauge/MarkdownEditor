import { createContext, useRef, useCallback, type ReactNode } from 'react';

type InsertFn = (text: string) => void;

export interface EditorInsertContextValue {
  insertText: InsertFn;
  registerInsert: (fn: InsertFn | null) => void;
}

export const EditorInsertContext = createContext<EditorInsertContextValue | null>(null);

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
