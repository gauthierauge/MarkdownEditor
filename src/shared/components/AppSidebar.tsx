import { useNavigate } from 'react-router-dom'
import { FileTree } from '@/features/file-tree/FileTree'
import { useMarkdownImport } from '@/features/markdown-editor/hooks/useMarkdownImport'
import { Button } from '@/shared/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/shared/components/ui/sidebar'
import { useAppSelector } from '@/shared/store/hooks'
import { selectFileTree } from '@/shared/store/slices/foldersSlice'

function AppSidebar() {
  const navigate = useNavigate()
  const tree = useAppSelector(selectFileTree)
  const { handleFileChange, handleImportClick, inputRef } = useMarkdownImport({
    onImported: (fileId) => navigate(`/markdown/${fileId}`),
  })

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <h1 className="m-0 text-lg font-semibold text-sidebar-foreground">
          Markdown Editor
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pr-1">
            Explorateur
            <Button
              onClick={handleImportClick}
              size="xs"
              title="Importer un fichier .md"
              variant="ghost"
            >
              Importer
            </Button>
          </SidebarGroupLabel>

          <input
            accept=".md,text/markdown"
            className="hidden"
            onChange={handleFileChange}
            ref={inputRef}
            type="file"
          />

          <SidebarGroupContent className="px-2">
            <FileTree
              data={tree}
              onFileClick={(file) => navigate(`/markdown/${file.id}`)}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
