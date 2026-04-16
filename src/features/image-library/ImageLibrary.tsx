import ImageImportExport from '@/features/image-import-export/ImageImportExport'
import { Button, EmptyState, Input, PageHeader, Panel } from '@/shared/components'
import ImageCard from './components/ImageCard'
import ImageDropZone from './components/ImageDropZone'
import ImagePreviewModal from './components/ImagePreviewModal'
import RenameImageModal from './components/RenameImageModal'
import useImageLibrary from './hooks/useImageLibrary'
import './styles/ImageLibrary.css'

function ImageLibrary() {
  const {
    busy,
    currentFileId,
    errorMessage,
    filteredImages,
    handleDelete,
    handleImageFiles,
    handleImportedImages,
    handleInsert,
    handleRename,
    images,
    navigateToCurrentFile,
    previewedImage,
    renamedImage,
    searchValue,
    setPreviewedImage,
    setRenamedImage,
    setSearchValue,
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
        description="Upload, stockage IndexedDB, galerie, insertion Markdown et import/export sont tous opérationnels ici."
        eyebrow="Route /images"
        title="Bibliothèque d’images"
      />

      <div className="content-grid content-grid--images">
        <Panel
          description={`Le Markdown généré sera injecté dans le fichier ${currentFileId}.`}
          title="Ajout et insertion"
        >
          <ImageDropZone busy={busy} onFilesSelected={handleImageFiles} />

          <div className="target-summary">
            <p>
              Fichier cible actuel : <strong>{currentFileId}</strong>
            </p>
            <Button onClick={navigateToCurrentFile}>Ouvrir le fichier cible</Button>
          </div>

          {statusMessage ? <p className="status-message">{statusMessage}</p> : null}
          {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
        </Panel>

        <Panel
          description="Recherche par nom et rappel des conventions d’export."
          title="Filtrer et exporter"
        >
          <Input
            label="Recherche"
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Nom d’image"
            value={searchValue}
          />
          <ul className="placeholder-list">
            <li>`.img.mdlc` pour une image unique.</li>
            <li>`.imgs.mdlc` pour toute la bibliothèque.</li>
            <li>Le stockage local des images passe par IndexedDB via `idb`.</li>
          </ul>
        </Panel>
      </div>

      <Panel
        actions={<span className="panel-counter">{filteredImages.length} image(s)</span>}
        description="Survol pour un aperçu rapide, clic sur le nom pour un aperçu complet, clic sur la miniature pour une insertion directe."
        title="Galerie"
      >
        {status === 'loading' && !images.length ? (
          <p className="status-message">Chargement de la bibliothèque…</p>
        ) : null}

        {!filteredImages.length ? (
          <EmptyState
            description="Ajoute des images avec le bouton Parcourir, le drag and drop ou l’import .img/.imgs.mdlc."
            title="Aucune image à afficher"
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
