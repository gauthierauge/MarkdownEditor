import { useBlockForm } from './useBlockForm.ts';
import BlockPreview from './BlockPreview.tsx';

type Props = {
  blockId?: string;
  onSaved?: () => void;
};

export default function BlockForm({ blockId, onSaved }: Props) {
  const {
    name, setName,
    content, setContent,
    isEditing, canSave,
    handleCreate, handleUpdate, handleDelete,
  } = useBlockForm(blockId, onSaved);

  return (
    <div className="flex flex-col gap-4 bg-[#1f1f1f] rounded-lg p-5 border border-[#2e303a]">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 m-0">
        {isEditing ? 'Modifier le bloc' : 'Nouveau bloc'}
      </h2>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du bloc"
            className="bg-[#1a1a2e] text-gray-200 px-3 py-2 rounded border border-[#2e303a] outline-none focus:border-purple-400 text-sm"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenu markdown du bloc..."
            className="bg-[#1a1a2e] text-gray-200 px-3 py-2 rounded border border-[#2e303a] outline-none focus:border-purple-400 text-sm font-mono flex-1 min-h-[250px] resize-y"
          />
        </div>

        <div className="flex-1 bg-[#252525] rounded border border-[#2e303a] overflow-auto min-h-[250px]">
          <BlockPreview content={content} />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        {isEditing ? (
          <>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm rounded bg-red-900/30 text-red-400 border border-red-800/50 hover:bg-red-900/50 transition-colors cursor-pointer"
            >
              Supprimer
            </button>
            <button
              onClick={handleUpdate}
              disabled={!canSave}
              className="px-4 py-2 text-sm rounded bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Enregistrer
            </button>
          </>
        ) : (
          <button
            onClick={handleCreate}
            disabled={!canSave}
            className="px-4 py-2 text-sm rounded bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Créer le bloc
          </button>
        )}
      </div>
    </div>
  );
}
