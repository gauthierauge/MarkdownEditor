export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => {
      reject(new Error(`Impossible de lire le fichier ${file.name}.`))
    }

    reader.onload = () => {
      const result = reader.result

      if (typeof result !== 'string') {
        reject(new Error(`Le contenu de ${file.name} est invalide.`))
        return
      }

      resolve(result)
    }

    reader.readAsDataURL(file)
  })
}

export function readFileAsText(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => {
      reject(new Error(`Impossible de lire le fichier ${file.name}.`))
    }

    reader.onload = () => {
      const result = reader.result

      if (typeof result !== 'string') {
        reject(new Error(`Le contenu de ${file.name} est invalide.`))
        return
      }

      resolve(result)
    }

    reader.readAsText(file)
  })
}
