import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findNode } from '@/features/file-tree/services/tree.service'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { selectFileTree } from '@/shared/store/slices/foldersSlice'
import { openFile } from '@/shared/store/slices/markdownSlice'
import MarkdownEditor from './MarkdownEditor'

function MarkdownRoutePage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const tree = useAppSelector(selectFileTree)
  const fileId = id ?? 'welcome'
  const fileNode = findNode(tree, fileId)
  const fileName = fileNode?.type === 'file' ? fileNode.name : fileId

  useEffect(() => {
    dispatch(openFile({ id: fileId, name: fileName }))
  }, [dispatch, fileId, fileName])

  return <MarkdownEditor />
}

export default MarkdownRoutePage
