import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type Props = { content: string };

export default function BlockPreview({ content }: Props) {
  if (!content.trim()) {
    return (
      <div className="h-full flex items-center justify-center text-gray-600 italic text-sm">
        Aperçu du bloc...
      </div>
    );
  }

  return (
    <div className="prose prose-invert prose-sm max-w-none p-4 text-gray-300">
      <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </div>
  );
}
