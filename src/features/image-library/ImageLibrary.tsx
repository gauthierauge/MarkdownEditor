import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { ImageCard } from './components/ImageCard';
import { ImageDropZone } from './components/ImageDropZone';
import { ImagePreviewDialog } from './components/ImagePreviewDialog';
import { RenameImageDialog } from './components/RenameImageDialog';
import { useImageLibrary } from './hooks/useImageLibrary';
import './styles/ImageLibrary.css';

export default function ImageLibrary() {
  const {
    filteredImages,
    images,
    imagesError,
    imagesStatus,
    openFileId,
    openFileName,
    query,
    setQuery,
    feedback,
    previewedImage,
    renamedImage,
    importInputRef,
    canInsert,
    setPreviewedImage,
    setRenamedImage,
    handleFilesSelected,
    handleDelete,
    handleRename,
    handleInsert,
    handleExportLibrary,
    handleExportSingle,
    openImportDialog,
    handleImportChange,
  } = useImageLibrary();

  return (
    <div className="image-library-page">
      <div className="image-library-page__header">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Bibliothèque d’images
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Images</h1>
          <p className="text-sm text-muted-foreground">
            Upload, drag and drop, insertion Markdown et import/export de la bibliothèque.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={importInputRef}
            type="file"
            accept=".img.mdlc,.imgs.mdlc,application/json"
            className="hidden"
            onChange={handleImportChange}
          />
          <Button variant="outline" onClick={openImportDialog}>
            Importer
          </Button>
          <Button variant="outline" onClick={handleExportLibrary} disabled={images.length === 0}>
            Exporter la bibliothèque
          </Button>
        </div>
      </div>

      <div className="image-library-page__top">
        <section className="image-panel">
          <h2 className="image-panel__title">Ajout et insertion</h2>
          <ImageDropZone onFilesSelected={handleFilesSelected} />

          <div className="image-panel__hint">
            {openFileId ? (
              <span>
                Le bouton <strong>Insérer</strong> ajoutera l’image dans{' '}
                <strong>{openFileName ?? openFileId}</strong>.
              </span>
            ) : (
              <span>Ouvre un fichier Markdown avant d’utiliser le bouton Insérer.</span>
            )}
          </div>
        </section>

        <section className="image-panel">
          <h2 className="image-panel__title">Recherche</h2>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nom d'image"
          />

          <div className="image-panel__help">
            <p><code>.img.mdlc</code> pour une image unique.</p>
            <p><code>.imgs.mdlc</code> pour toute la bibliothèque.</p>
            <p>Les images sont stockées en local dans IndexedDB.</p>
          </div>
        </section>
      </div>

      {feedback ? (
        <div
          className={`image-feedback ${
            feedback.tone === 'error' ? 'is-error' : 'is-success'
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      {imagesError ? <div className="image-feedback is-error">{imagesError}</div> : null}

      <section className="image-panel image-gallery-panel">
        <div className="image-gallery-panel__header">
          <div>
            <h2 className="image-panel__title">Galerie</h2>
            <p className="text-sm text-muted-foreground">
              {images.length} image(s) dans la bibliothèque.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {imagesStatus === 'loading' ? 'Chargement…' : `${filteredImages.length} image(s) visibles`}
          </div>
        </div>

        {filteredImages.length > 0 ? (
          <div className="image-grid">
            {filteredImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                canInsert={canInsert}
                onPreview={setPreviewedImage}
                onRename={setRenamedImage}
                onDelete={(target) => void handleDelete(target)}
                onInsert={handleInsert}
                onExport={handleExportSingle}
              />
            ))}
          </div>
        ) : (
          <div className="image-empty-state">
            <p className="font-medium text-foreground">Aucune image à afficher</p>
            <p className="text-sm text-muted-foreground">
              Ajoute des images avec le bouton Parcourir, le drag and drop ou l’import .img/.imgs.mdlc.
            </p>
          </div>
        )}
      </section>

      <ImagePreviewDialog
        image={previewedImage}
        open={Boolean(previewedImage)}
        canInsert={canInsert}
        onOpenChange={(open) => {
          if (!open) {
            setPreviewedImage(null);
          }
        }}
        onInsert={handleInsert}
      />

      <RenameImageDialog
        image={renamedImage}
        open={Boolean(renamedImage)}
        onOpenChange={(open) => {
          if (!open) {
            setRenamedImage(null);
          }
        }}
        onRename={handleRename}
      />
    </div>
  );
}
