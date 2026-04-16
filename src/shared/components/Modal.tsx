import { useEffect, useId, type PropsWithChildren, type ReactNode } from 'react'
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

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  if (!open) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="ui-modal-backdrop"
      onMouseDown={onClose}
      role="presentation"
    >
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className="ui-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="ui-modal__header">
          <div>
            <h2 className="ui-modal__title" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="ui-modal__description" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          <Button aria-label="Fermer" onClick={onClose} variant="ghost">
            Fermer
          </Button>
        </header>
        <div className="ui-modal__content">{children}</div>
        {footer ? <footer className="ui-modal__footer">{footer}</footer> : null}
      </div>
    </div>
  )
}

export default Modal
