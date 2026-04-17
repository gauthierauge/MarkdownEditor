import ExportImagesButton from '@/features/image-import-export/components/ExportImagesButton'
import { Button } from '@/shared/components'
import type { StoredImage } from '../types/ImageLibrary.types'

type ImageCardProps = {
  image: StoredImage
  onDelete: (image: StoredImage) => void
  onInsert: (image: StoredImage) => void
  onPreview: (image: StoredImage) => void
  onRename: (image: StoredImage) => void
}

function ImageCard({
  image,
  onDelete,
  onInsert,
  onPreview,
  onRename,
}: ImageCardProps) {
  return (
    <article className="image-card">
      <div className="image-card__visuals">
        <button
          className="image-card__thumbnail"
          onClick={() => onPreview(image)}
          title="Cliquer pour ouvrir l'apercu"
          type="button"
        >
          <img alt={image.name} src={image.dataUrl} />
        </button>
      </div>

      <div className="image-card__body">
        <button
          className="image-card__name"
          onClick={() => onPreview(image)}
          type="button"
        >
          {image.name}
        </button>
        <p className="image-card__meta">
          {image.mimeType} - {Math.max(1, Math.round(image.byteSize / 1024))} Ko
        </p>
        <p className="image-card__hint">
          Clique la miniature pour ouvrir l'image en grand.
        </p>
      </div>

      <div className="image-card__actions">
        <Button onClick={() => onInsert(image)} variant="secondary">
          Inserer
        </Button>
        <Button onClick={() => onPreview(image)} variant="ghost">
          Apercu
        </Button>
        <Button onClick={() => onRename(image)} variant="ghost">
          Renommer
        </Button>
        <ExportImagesButton
          fileName={`${image.name}.img.mdlc`}
          images={[image]}
          label="Exporter"
          variant="ghost"
        />
        <Button onClick={() => onDelete(image)} variant="danger">
          Supprimer
        </Button>
      </div>
    </article>
  )
}

export default ImageCard
