import { useImportExport } from './useImportExport.ts'
import ExportButton from './ExportButton.tsx'
import ImportButton from './ImportButton.tsx'

export default function ImportExport() {
  const {
    blocks,
    selectedExportId,
    setSelectedExportId,
    selectedBlock,
    getAllContent,
    getAllFilename,
    getSingleContent,
    getSingleFilename,
    handleImport,
    handleError,
    feedback,
  } = useImportExport()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <ExportButton
        label="Exporter tout"
        getFilename={getAllFilename}
        getContent={getAllContent}
        disabled={blocks.length === 0}
      />

      <div className="flex items-center gap-1">
        <select
          value={selectedExportId}
          onChange={(event) => setSelectedExportId(event.target.value)}
          className="cursor-pointer rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1.5 text-xs text-[var(--color-text)] outline-none"
        >
          <option value="">Choisir un bloc</option>
          {blocks.map((block) => (
            <option key={block.id} value={block.id}>
              {block.name}
            </option>
          ))}
        </select>
        <ExportButton
          label="Exporter"
          getFilename={getSingleFilename}
          getContent={getSingleContent}
          disabled={!selectedBlock}
        />
      </div>

      <ImportButton onImport={handleImport} onError={handleError} />

      {feedback ? (
        <span className="text-xs text-[var(--color-primary)]">{feedback}</span>
      ) : null}
    </div>
  )
}
