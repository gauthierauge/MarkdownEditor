import type { StoredImage } from '../types'
import { Button, Modal } from '@/shared/components'

type ImagePreviewModalProps = {
  image: StoredImage | null
  onClose: () => void
  onInsert: (image: StoredImage) => void
}

function ImagePreviewModal({
  image,
  onClose,
  onInsert,
}: ImagePreviewModalProps) {
  if (!image) {
    return null
  }

  return (
    <Modal
      description="Prévisualisation complète de l’image avant insertion."
      footer={
        <>
          <Button onClick={() => onInsert(image)} variant="secondary">
            Insérer dans l’éditeur
          </Button>
          <Button onClick={onClose} variant="ghost">
            Fermer
          </Button>
        </>
      }
      onClose={onClose}
      open={Boolean(image)}
      title={image.name}
    >
      <div className="image-preview-modal">
        <img alt={image.name} className="image-preview-modal__image" src={image.dataUrl} />
        <dl className="image-preview-modal__meta">
          <div>
            <dt>Type</dt>
            <dd>{image.mimeType}</dd>
          </div>
          <div>
            <dt>Taille</dt>
            <dd>{Math.round(image.byteSize / 1024)} Ko</dd>
          </div>
          <div>
            <dt>Ajoutée</dt>
            <dd>{new Date(image.createdAt).toLocaleString()}</dd>
          </div>
        </dl>
      </div>
    </Modal>
  )
}

export default ImagePreviewModal
