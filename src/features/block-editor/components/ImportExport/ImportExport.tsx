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
    <div className="flex items-center gap-3">
      <ExportButton
        label="Exporter tout"
        getFilename={getAllFilename}
        getContent={getAllContent}
        disabled={blocks.length === 0}
      />

      <div className="flex items-center gap-1">
        <Select
          value={selectedExportId || undefined}
          onValueChange={(v) => setSelectedExportId(v ?? '')}
        >
          <SelectTrigger size="sm">
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

      <ImportButton onImport={handleImport} onError={handleError} />

      {feedback && (
        <span className="text-xs text-emerald-400 animate-pulse">{feedback}</span>
      )}
    </div>
  );
}
