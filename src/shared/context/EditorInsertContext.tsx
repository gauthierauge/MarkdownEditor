import { createContext, useContext, useRef, useCallback, type ReactNode } from 'react';

type InsertFn = (text: string) => void;

interface EditorInsertContextValue {
  insertText: InsertFn;
  registerInsert: (fn: InsertFn | null) => void;
}

const EditorInsertContext = createContext<EditorInsertContextValue | null>(null);

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

export function useEditorInsert() {
  const ctx = useContext(EditorInsertContext);
  if (!ctx) throw new Error('useEditorInsert must be used within EditorInsertProvider');
  return ctx;
}
