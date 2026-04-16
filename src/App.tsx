import { useEffect } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { BlockLibrary } from '@/features/block-library'
import { ImageLibrary } from '@/features/image-library'
import { MainEditor } from '@/features/main-editor'
import { AppLayout } from '@/shared/components'
import { useAppDispatch } from '@/shared/hooks'
import { setImages, setImagesError, setImagesStatus } from '@/store/imagesSlice'
import { getAllImagesFromDb } from '@/utils/imagesDb'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate replace to="/files/welcome" /> },
      { path: 'files/:id', element: <MainEditor /> },
      { path: 'blocks', element: <BlockLibrary /> },
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

        const message =
          error instanceof Error
            ? error.message
            : 'Impossible de charger la bibliothèque d’images.'

        dispatch(setImagesError(message))
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
