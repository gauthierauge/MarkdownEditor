import { useMarkdownHtml } from './useMarkdownHtml';

type Props = {
  content: string;
  className?: string;
  emptyMessage?: string;
  imageMap?: Record<string, string>;
};

export default function MarkdownPreview({
  content,
  className = 'prose prose-sm max-w-none',
  emptyMessage,
  imageMap,
}: Props) {
  const html = useMarkdownHtml(content, imageMap);

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
