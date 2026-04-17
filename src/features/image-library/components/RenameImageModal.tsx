import { useState, type FormEvent } from 'react'
import { Button, Input, Modal } from '@/shared/components'
import type { StoredImage } from '../types/ImageLibrary.types'

type RenameImageModalProps = {
  image: StoredImage | null
  onClose: () => void
  onConfirm: (name: string) => void
}

function RenameImageModal({
  image,
  onClose,
  onConfirm,
}: RenameImageModalProps) {
  if (!image) {
    return null
  }

  return (
    <RenameImageModalContent image={image} onClose={onClose} onConfirm={onConfirm} />
  )
}

type RenameImageModalContentProps = {
  image: StoredImage
  onClose: () => void
  onConfirm: (name: string) => void
}

function RenameImageModalContent({
  image,
  onClose,
  onConfirm,
}: RenameImageModalContentProps) {
  const [name, setName] = useState(image.name)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      return
    }

    onConfirm(trimmedName)
  }

  return (
    <Modal
      description="Le renommage met a jour le nom affiche et l'alt text Markdown genere."
      footer={
        <>
          <Button form="rename-image-form" type="submit" variant="primary">
            Enregistrer
          </Button>
          <Button onClick={onClose} variant="ghost">
            Annuler
          </Button>
        </>
      }
      onClose={onClose}
      open={Boolean(image)}
      title="Renommer l'image"
    >
      <form id="rename-image-form" onSubmit={handleSubmit}>
        <Input
          autoFocus
          label="Nom affiche"
          onChange={(event) => setName(event.target.value)}
          placeholder="Nom de l'image"
          value={name}
        />
      </form>
    </Modal>
  )
}

export default RenameImageModal
