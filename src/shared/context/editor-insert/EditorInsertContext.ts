import { createContext } from 'react';

type InsertFn = (text: string) => void;

interface EditorInsertContextValue {
  insertText: InsertFn;
  registerInsert: (fn: InsertFn | null) => void;
}

export const EditorInsertContext = createContext<EditorInsertContextValue | null>(null);
