import type { MouseEvent } from 'react'

interface DeleteConfirmButtonProps {
  label: string
  onConfirm: () => void
}

export function DeleteConfirmButton({
  label,
  onConfirm,
}: DeleteConfirmButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (window.confirm(`Supprimer "${label}" ?`)) {
      onConfirm()
    }
  }

  return (
    <button
      className="p-0.5 rounded hover:bg-destructive hover:text-destructive-foreground text-xs"
      onClick={handleClick}
      tabIndex={-1}
      title={`Supprimer ${label}`}
      type="button"
    >
      Supprimer
    </button>
  )
}
