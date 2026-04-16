import { useEffect } from 'react'
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useParams,
} from 'react-router-dom'
import BlockEditor from '@/features/block-editor/BlockEditor'
import MainEditor from '@/features/block-editor/components/MainEditor/MainEditor'
import ImageLibrary from '@/features/image-library/ImageLibrary'
import { AppLayout, Panel } from '@/shared/components'
import { useAppDispatch } from '@/shared/hooks'
import {
  openFile,
  setImages,
  setImagesError,
  setImagesStatus,
} from '@/shared/store'
import { getAllImagesFromDb } from '@/utils/imagesDb'

function FileEditorPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const fileId = id ?? 'welcome'

  useEffect(() => {
    dispatch(openFile(fileId))
  }, [dispatch, fileId])

  return (
    <div className="page">
      <Panel
        description={`Edition du fichier ${fileId}. Le contenu insere depuis le bloc images apparait ici.`}
        title={`Fichier ${fileId}`}
      >
        <MainEditor />
      </Panel>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate replace to="/files/welcome" /> },
      { path: 'files/:id', element: <FileEditorPage /> },
      { path: 'blocks', element: <BlockEditor /> },
      { path: 'images', element: <ImageLibrary /> },
      { path: '*', element: <Navigate replace to="/files/welcome" /> },
    ],
  },
])

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isMounted = true

    async function hydrateImages() {
      dispatch(setImagesStatus('loading'))

      try {
        const images = await getAllImagesFromDb()

        if (!isMounted) {
          return
        }

        dispatch(setImages(images))
      } catch (error) {
        if (!isMounted) {
          return
        }

        dispatch(
          setImagesError(
            error instanceof Error
              ? error.message
              : "Impossible de charger la bibliotheque d'images.",
          ),
        )
      }
    }

    void hydrateImages()

    return () => {
      isMounted = false
    }
  }, [dispatch])

  return <RouterProvider router={router} />
}

export default App
