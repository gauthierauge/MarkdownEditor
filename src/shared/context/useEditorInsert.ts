import { useContext } from 'react';
import { EditorInsertContext } from './EditorInsertContext';

export function useEditorInsert() {
  const ctx = useContext(EditorInsertContext);
  if (!ctx) throw new Error('useEditorInsert must be used within EditorInsertProvider');
  return ctx;
}
