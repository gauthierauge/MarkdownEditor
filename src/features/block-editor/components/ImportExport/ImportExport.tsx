import ExportButton from './ExportButton'
import ImportButton from './ImportButton'
import { useImportExport } from './useImportExport'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

function ImportExport() {
  const {
    blocks,
    feedback,
    getAllContent,
    getAllFilename,
    getSingleContent,
    getSingleFilename,
    handleError,
    handleImport,
    selectedBlock,
    selectedExportId,
    setSelectedExportId,
  } = useImportExport()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <ExportButton
          disabled={blocks.length === 0}
          getContent={getAllContent}
          getFilename={getAllFilename}
          label="Exporter tout"
        />
        <ImportButton onError={handleError} onImport={handleImport} />
      </div>

      <div className="flex gap-2">
        <Select
          onValueChange={(value) => setSelectedExportId(value ?? '')}
          value={selectedExportId || undefined}
        >
          <SelectTrigger className="flex-1" size="sm">
            <SelectValue placeholder="Choisir un bloc" />
          </SelectTrigger>
          <SelectContent>
            {blocks.map((block) => (
              <SelectItem key={block.id} value={block.id}>
                {block.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ExportButton
          disabled={!selectedBlock}
          getContent={getSingleContent}
          getFilename={getSingleFilename}
          label="Exporter"
        />
      </div>

      {feedback ? (
        <span className="text-xs text-emerald-500">{feedback}</span>
      ) : null}
    </div>
  )
}

export default ImportExport
