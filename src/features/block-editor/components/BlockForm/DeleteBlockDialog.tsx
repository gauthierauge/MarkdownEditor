import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'

type Props = {
  blockName: string
  onConfirm: () => void
}

function DeleteBlockDialog({ blockName, onConfirm }: Props) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button size="sm" variant="destructive">
            Supprimer
          </Button>
        }
      />

      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Supprimer le bloc</DialogTitle>
          <DialogDescription>
            Le bloc "{blockName || 'sans nom'}" sera supprime definitivement.
            Cette action est irreversible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:flex-row">
          <Button onClick={() => setOpen(false)} size="sm" variant="outline">
            Annuler
          </Button>
          <Button onClick={handleConfirm} size="sm" variant="destructive">
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBlockDialog
