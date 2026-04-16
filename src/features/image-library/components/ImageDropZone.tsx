import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/shared/components'

type ImageDropZoneProps = {
  busy?: boolean
  onFilesSelected: (files: File[]) => Promise<void> | void
}

function ImageDropZone({ busy = false, onFilesSelected }: ImageDropZoneProps) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        return
      }

      void onFilesSelected(acceptedFiles)
    },
    [onFilesSelected],
  )

  const { getInputProps, getRootProps, isDragActive, open } = useDropzone({
    accept: {
      'image/*': [],
    },
    disabled: busy,
    multiple: true,
    noClick: true,
    onDrop: handleDrop,
  })

  return (
    <div
      {...getRootProps({
        className: [
          'image-dropzone',
          isDragActive ? 'image-dropzone--active' : '',
          busy ? 'image-dropzone--busy' : '',
        ]
          .filter(Boolean)
          .join(' '),
      })}
    >
      <input {...getInputProps()} />
      <p className="image-dropzone__title">Depose tes images ici</p>
      <p className="image-dropzone__description">
        PNG, JPG, WebP, SVG... Les fichiers sont convertis en base64 puis stockes
        en IndexedDB.
      </p>
      <Button disabled={busy} onClick={open} variant="primary">
        {busy ? 'Traitement...' : 'Parcourir'}
      </Button>
    </div>
  )
}

export default ImageDropZone
