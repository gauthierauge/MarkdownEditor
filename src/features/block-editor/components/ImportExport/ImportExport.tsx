import { useImportExport } from './useImportExport.ts';
import ExportButton from './ExportButton.tsx';
import ImportButton from './ImportButton.tsx';

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
        <select
          value={selectedExportId}
          onChange={(e) => setSelectedExportId(e.target.value)}
          className="bg-[#1a1a2e] text-gray-300 text-xs px-2 py-1.5 rounded border border-[#2e303a] outline-none cursor-pointer"
        >
          <option value="">Choisir un bloc</option>
          {blocks.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
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

      {feedback && (
        <span className="text-xs text-emerald-400 animate-pulse">{feedback}</span>
      )}
    </div>
  );
}
