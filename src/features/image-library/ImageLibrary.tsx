import ImageImportExport from '@/features/image-import-export/ImageImportExport'
import { EmptyState, PageHeader, Panel } from '@/shared/components'
import ImageCard from './components/ImageCard'
import ImageDropZone from './components/ImageDropZone'
import ImagePreviewModal from './components/ImagePreviewModal'
import RenameImageModal from './components/RenameImageModal'
import useImageLibrary from './hooks/useImageLibrary'
import './styles/ImageLibrary.css'

function ImageLibrary() {
  const {
    busy,
    errorMessage,
    filteredImages,
    handleDelete,
    handleImageFiles,
    handleImportedImages,
    handleInsert,
    handleRename,
    images,
    previewedImage,
    renamedImage,
    setPreviewedImage,
    setRenamedImage,
    setStatusMessage,
    status,
    statusMessage,
  } = useImageLibrary()

  return (
    <div className="page image-library">
      <PageHeader
        actions={
          <ImageImportExport
            images={images}
            onError={setStatusMessage}
            onImport={handleImportedImages}
          />
        }
        eyebrow="Route /images"
        title="Bibliotheque d'images"
      />

      <div className="content-grid content-grid--images">
        <Panel title="Ajout et insertion">
          <ImageDropZone busy={busy} onFilesSelected={handleImageFiles} />

          {statusMessage ? <p className="status-message">{statusMessage}</p> : null}
          {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
        </Panel>
      </div>

      <Panel
        actions={<span className="panel-counter">{filteredImages.length} image(s)</span>}
        title="Galerie"
      >
        {status === 'loading' && !images.length ? (
          <p className="status-message">Chargement de la bibliotheque...</p>
        ) : null}

        {!filteredImages.length ? (
          <EmptyState
            description="Ajoute des images avec le bouton Parcourir, le drag and drop ou l'import .img/.imgs.mdlc."
            title="Aucune image a afficher"
          />
        ) : (
          <div className="image-grid">
            {filteredImages.map((image) => (
              <ImageCard
                image={image}
                key={image.id}
                onDelete={handleDelete}
                onInsert={handleInsert}
                onPreview={setPreviewedImage}
                onRename={setRenamedImage}
              />
            ))}
          </div>
        )}
      </Panel>

      <ImagePreviewModal
        image={previewedImage}
        onClose={() => setPreviewedImage(null)}
        onInsert={handleInsert}
      />

      <RenameImageModal
        image={renamedImage}
        onClose={() => setRenamedImage(null)}
        onConfirm={handleRename}
      />
    </div>
  )
}

export default ImageLibrary
