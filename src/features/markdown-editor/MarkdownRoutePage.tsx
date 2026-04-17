import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownEditor from './MarkdownEditor';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { selectFileTree } from '@/shared/store/slices/foldersSlice';
import { openFile } from '@/shared/store/slices/markdownSlice';
import type { FileNode } from '@/features/file-tree/types/FileTree.types';

function findFileById(nodes: FileNode[], id: string): FileNode | null {
  for (const node of nodes) {
    if (node.id === id && node.type === 'file') {
      return node;
    }

    if (node.type === 'folder' && node.children) {
      const match = findFileById(node.children, id);
      if (match) {
        return match;
      }
    }
  }

  return null;
}

export default function MarkdownRoutePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const fileTree = useAppSelector(selectFileTree);

  useEffect(() => {
    if (!id) {
      return;
    }

    const file = findFileById(fileTree, id);
    dispatch(
      openFile({
        id,
        name: file?.name ?? id,
      }),
    );
  }, [dispatch, fileTree, id]);

  return <MarkdownEditor />;
}
