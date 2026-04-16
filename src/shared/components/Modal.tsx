import { useId, type PropsWithChildren, type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Button from './Button'

type ModalProps = PropsWithChildren<{
  description?: string
  footer?: ReactNode
  onClose: () => void
  open: boolean
  title: string
}>

function Modal({
  children,
  description,
  footer,
  onClose,
  open,
  title,
}: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()

  if (!open) {
    return null
  }

  return (
    <Dialog onOpenChange={(nextOpen) => !nextOpen && onClose()} open={open}>
      <DialogContent
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        className="ui-modal"
      >
        <DialogHeader className="ui-modal__header">
          <div>
            <DialogTitle className="ui-modal__title" id={titleId}>
              {title}
            </DialogTitle>
            {description ? (
              <DialogDescription className="ui-modal__description" id={descriptionId}>
                {description}
              </DialogDescription>
            ) : null}
          </div>
          <Button aria-label="Fermer" onClick={onClose} variant="ghost">
            Fermer
          </Button>
        </DialogHeader>
        <div className="ui-modal__content">{children}</div>
        {footer ? <DialogFooter className="ui-modal__footer">{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
