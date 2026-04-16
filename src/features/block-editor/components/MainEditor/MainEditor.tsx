import { useMainEditor } from './useMainEditor.ts';

export default function MainEditor() {
  const { textareaRef, content, handlers } = useMainEditor();

  return (
    <textarea
      ref={textareaRef}
      className="w-full min-h-[400px] flex-1 bg-[#1a1a2e] text-gray-200 font-mono text-[15px] leading-relaxed p-5 border border-[#2e303a] rounded-md resize-y outline-none focus:border-purple-400"
      value={content}
      {...handlers}
      placeholder="Start typing markdown..."
      spellCheck={false}
    />
  );
}
