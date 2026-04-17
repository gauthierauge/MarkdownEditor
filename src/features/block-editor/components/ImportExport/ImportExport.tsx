import { useImportExport } from './useImportExport';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

export default function ImportExport() {
  const {
    blocks,
    selectedExportId, setSelectedExportId,
    selectedBlock,
    getAllContent, getAllFilename,
    getSingleContent, getSingleFilename,
    handleImport, handleError,
    feedback,
  } = useImportExport();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <ExportButton
          label="Exporter tout"
          getFilename={getAllFilename}
          getContent={getAllContent}
          disabled={blocks.length === 0}
        />
        <ImportButton onImport={handleImport} onError={handleError} />
      </div>

      <div className="flex gap-2">
        <Select
          value={selectedExportId || undefined}
          onValueChange={(v) => setSelectedExportId(v ?? '')}
        >
          <SelectTrigger size="sm" className="flex-1">
            <SelectValue placeholder="Choisir un bloc" />
          </SelectTrigger>
          <SelectContent>
            {blocks.map((b) => (
              <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ExportButton
          label="Exporter"
          getFilename={getSingleFilename}
          getContent={getSingleContent}
          disabled={!selectedBlock}
        />
      </div>

      {feedback && (
        <span className="text-xs text-emerald-400 animate-pulse">{feedback}</span>
      )}
    </div>
  );
}
