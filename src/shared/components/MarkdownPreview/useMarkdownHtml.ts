import { useMemo } from 'react';
import { Marked } from 'marked';
import DOMPurify from 'dompurify';
import { IMAGE_URI_PREFIX } from '@/features/image-library/constants/image.constants';

export function useMarkdownHtml(
  content: string,
  imageMap?: Record<string, string>,
): string {
  return useMemo(() => {
    const instance = new Marked();

    if (imageMap) {
      instance.use({
        renderer: {
          image({ href, title, text }) {
            if (href.startsWith(IMAGE_URI_PREFIX)) {
              const id = href.slice(IMAGE_URI_PREFIX.length);
              const dataUrl = imageMap[id];
              if (!dataUrl) {
                return `<span class="text-muted-foreground italic">[Image manquante]</span>`;
              }
              const titleAttr = title ? ` title="${title}"` : '';
              return `<img src="${dataUrl}" alt="${text}"${titleAttr} />`;
            }
            const titleAttr = title ? ` title="${title}"` : '';
            return `<img src="${href}" alt="${text}"${titleAttr} />`;
          },
        },
      });
    }

    return DOMPurify.sanitize(instance.parse(content) as string);
  }, [content, imageMap]);
}
