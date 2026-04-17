export type EditorDraft = {
  fileId: string | null;
  content: string;
};

export type InsertResult = {
  content: string;
  cursorPosition: number;
};
