import { useBlockForm } from './useBlockForm.ts'
import BlockPreview from './BlockPreview.tsx'

type Props = {
  blockId?: string
  onSaved?: () => void
}

export default function BlockForm({ blockId, onSaved }: Props) {
  const {
    name,
    setName,
    content,
    setContent,
    isEditing,
    canSave,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useBlockForm(blockId, onSaved)

  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[rgba(215,221,228,0.9)] bg-white/90 p-5 shadow-[var(--color-shadow)]">
      <h2 className="m-0 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
        {isEditing ? 'Modifier le bloc' : 'Nouveau bloc'}
      </h2>

      <div className="flex min-h-0 flex-1 gap-4">
        <div className="flex flex-1 flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nom du bloc"
            className="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Contenu markdown du bloc..."
            className="min-h-[250px] flex-1 resize-y rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 font-mono text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <div className="min-h-[250px] flex-1 overflow-auto rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <BlockPreview content={content} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleDelete}
              className="cursor-pointer rounded-full border border-[rgba(163,59,50,0.16)] bg-[var(--color-danger-soft)] px-4 py-2 text-sm text-[var(--color-danger)] transition-colors hover:brightness-95"
            >
              Supprimer
            </button>
            <button
              onClick={handleUpdate}
              disabled={!canSave}
              className="cursor-pointer rounded-full border border-[rgba(31,79,143,0.16)] bg-[var(--color-primary-soft)] px-4 py-2 text-sm text-[var(--color-primary)] transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Enregistrer
            </button>
          </>
        ) : (
          <button
            onClick={handleCreate}
            disabled={!canSave}
            className="cursor-pointer rounded-full border border-[rgba(31,79,143,0.16)] bg-[var(--color-primary-soft)] px-4 py-2 text-sm text-[var(--color-primary)] transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Creer le bloc
          </button>
        )}
      </div>
    </div>
  )
}
