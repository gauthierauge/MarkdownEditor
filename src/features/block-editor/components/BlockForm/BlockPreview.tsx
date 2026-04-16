import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

type Props = { content: string }

export default function BlockPreview({ content }: Props) {
  if (!content.trim()) {
    return (
      <div className="flex h-full items-center justify-center text-sm italic text-[var(--color-text-muted)]">
        Apercu du bloc...
      </div>
    )
  }

  return (
    <div className="prose prose-sm max-w-none p-4 text-[var(--color-text)]">
      <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </div>
  )
}
