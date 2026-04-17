import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

type Props = {
  content: string;
  className?: string;
  emptyMessage?: string;
};

export default function MarkdownPreview({
  content,
  className = 'prose prose-sm max-w-none',
  emptyMessage,
}: Props) {
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(content) as string),
    [content],
  );

  if (!content.trim() && emptyMessage) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
