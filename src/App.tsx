import { useState } from 'react'
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import { PanelRightIcon } from 'lucide-react'
import { useShortcutListener } from '@/features/block-editor/hooks/useShortcutListener'
import ImageLibrary from '@/features/image-library/ImageLibrary'
import MarkdownRoutePage from '@/features/markdown-editor/MarkdownRoutePage'
import AppSidebar from '@/shared/components/AppSidebar'
import BlocksSidebar from '@/shared/components/BlocksSidebar'
import { Button } from '@/shared/components/ui/button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar'
import { useAppSelector } from '@/shared/store/hooks'
import { selectOpenFileId } from '@/shared/store/slices/markdownSlice'

function AppShell() {
  const openFileId = useAppSelector(selectOpenFileId)
  const [rightOpen, setRightOpen] = useState(true)
  useShortcutListener()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-0 overflow-hidden">
        <header className="flex items-center gap-2 border-b border-sidebar-border px-4 py-3">
          <SidebarTrigger />

          <div className="ml-auto">
            <Button
              onClick={() => setRightOpen((open) => !open)}
              size="icon-sm"
              variant="ghost"
            >
              <PanelRightIcon />
              <span className="sr-only">Afficher ou masquer les blocs</span>
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>

      <SidebarProvider
        className="w-auto! min-h-0!"
        onOpenChange={setRightOpen}
        open={rightOpen}
      >
        <BlocksSidebar />
      </SidebarProvider>
    </SidebarProvider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate replace to="/markdown/welcome" /> },
      { path: 'markdown', element: <Navigate replace to="/markdown/welcome" /> },
      { path: 'markdown/:id', element: <MarkdownRoutePage /> },
      { path: 'images', element: <ImageLibrary /> },
      { path: '*', element: <Navigate replace to="/markdown/welcome" /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
