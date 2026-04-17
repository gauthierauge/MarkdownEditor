import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { ImageCard } from './components/ImageCard';
import { ImageDropZone } from './components/ImageDropZone';
import { ImagePreviewDialog } from './components/ImagePreviewDialog';
import { RenameImageDialog } from './components/RenameImageDialog';
import { useImageLibrary } from './hooks/useImageLibrary';

export default function ImageLibrary() {
  const {
    filteredImages,
    images,
    imagesError,
    isLoadingDelayed,
    openFileId,
    openFileName,
    query,
    setQuery,
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
    <div className="flex flex-col gap-2">
      <ImageDropZone onFilesSelected={handleFilesSelected} />

      <div className="flex items-center gap-1">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher…"
          className="h-7 min-w-0 flex-1 text-xs"
        />
        <input
          ref={importInputRef}
          type="file"
          accept=".img.mdlc,.imgs.mdlc,application/json"
          className="hidden"
          onChange={handleImportChange}
        />
        <Button variant="outline" size="icon-xs" onClick={openImportDialog} title="Importer">
          <Download />
        </Button>
        <Button variant="outline" size="icon-xs" onClick={handleExportLibrary} disabled={images.length === 0} title="Exporter tout">
          <Upload />
        </Button>
      </div>

      {imagesError ? (
        <div className="rounded-md px-2 py-1 text-[11px] bg-red-500/8 text-red-700">
          {imagesError}
        </div>
      ) : null}

      {openFileId ? (
        <p className="m-0 truncate text-[10px] text-muted-foreground">
          Insertion dans <strong>{openFileName ?? openFileId}</strong>
        </p>
      ) : null}

      <div className="text-[10px] text-muted-foreground">
        {isLoadingDelayed ? 'Chargement…' : `${filteredImages.length} / ${images.length} image(s)`}
      </div>

      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-3 gap-1.5">
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              canInsert={canInsert}
              onPreview={setPreviewedImage}
              onInsert={handleInsert}
            />
          ))}
        </div>
      ) : (
        <p className="py-4 text-center text-xs text-muted-foreground">
          Aucune image.
        </p>
      )}

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
        onRename={setRenamedImage}
        onExport={handleExportSingle}
        onDelete={(target) => void handleDelete(target)}
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
