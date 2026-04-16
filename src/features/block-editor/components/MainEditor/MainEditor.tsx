import { useMainEditor } from './useMainEditor.ts';

export default function MainEditor() {
  const { textareaRef, content, handlers } = useMainEditor();

  return (
    <textarea
      ref={textareaRef}
      className="w-full min-h-[420px] flex-1 resize-y rounded-[20px] border border-[rgba(215,221,228,0.9)] bg-[var(--color-surface)] p-5 font-mono text-[15px] leading-relaxed text-[var(--color-text)] shadow-[var(--color-shadow)] outline-none focus:border-[var(--color-primary)]"
      value={content}
      {...handlers}
      placeholder="Start typing markdown..."
      spellCheck={false}
    />
  );
}
