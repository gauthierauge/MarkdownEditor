import DeleteBlockDialog from './DeleteBlockDialog'
import { useBlockForm } from './useBlockForm'
import MarkdownPreview from '@/shared/components/MarkdownPreview'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'

type Props = {
  blockId?: string
  onOpenChange: (open: boolean) => void
  open: boolean
}

function BlockFormDialog({ blockId, onOpenChange, open }: Props) {
  const {
    canSave,
    content,
    handleCreate,
    handleDelete,
    handleUpdate,
    isEditing,
    name,
    setContent,
    setName,
  } = useBlockForm(blockId, () => onOpenChange(false))

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Modifier le bloc' : 'Nouveau bloc'}</DialogTitle>
        </DialogHeader>

        <div className="flex min-h-[60vh] gap-6">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="block-name">
                Nom
              </label>
              <Input
                id="block-name"
                onChange={(event) => setName(event.target.value)}
                placeholder="Nom du bloc"
                type="text"
                value={name}
              />
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="block-content">
                Contenu
              </label>
              <Textarea
                className="min-h-[300px] flex-1 resize-y font-mono"
                id="block-content"
                onChange={(event) => setContent(event.target.value)}
                placeholder="Contenu markdown du bloc..."
                value={content}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">Apercu</span>
            <div className="flex-1 overflow-auto rounded-lg border border-border bg-background p-4">
              <MarkdownPreview content={content} emptyMessage="Apercu du bloc..." />
            </div>
          </div>
        </div>

        <DialogFooter>
          {isEditing ? (
            <>
              <DeleteBlockDialog blockName={name} onConfirm={handleDelete} />
              <Button disabled={!canSave} onClick={handleUpdate} size="sm" variant="outline">
                Enregistrer
              </Button>
            </>
          ) : (
            <Button disabled={!canSave} onClick={handleCreate} size="sm" variant="outline">
              Creer le bloc
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BlockFormDialog
