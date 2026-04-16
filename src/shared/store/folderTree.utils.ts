import type { FileNode } from '@/features/file-tree/types/FileTree.types';
import { nanoid } from '@reduxjs/toolkit';

export function findNode(tree: FileNode[], id: string): FileNode | null {
    for (const node of tree) {
        if (node.id === id) return node;
        if (node.children) {
            const found = findNode(node.children, id);
            if (found) return found;
        }
    }
    return null;
}

export function removeNode(tree: FileNode[], id: string): FileNode[] {
    return tree
        .filter((node) => node.id !== id)
        .map((node) =>
            node.children ? { ...node, children: removeNode(node.children, id) } : node
        );
}

export function renameNode(tree: FileNode[], id: string, name: string): FileNode[] {
    return tree.map((node) => {
        if (node.id === id) return { ...node, name };
        if (node.children) return { ...node, children: renameNode(node.children, id, name) };
        return node;
    });
}

export function insertIntoFolder(
    tree: FileNode[],
    parentId: string | null,
    node: FileNode
): FileNode[] {
    if (parentId === null) return [...tree, node];
    return tree.map((n) => {
        if (n.id === parentId) {
            return { ...n, children: [...(n.children ?? []), node] };
        }
        if (n.children) {
            return { ...n, children: insertIntoFolder(n.children, parentId, node) };
        }
        return n;
    });
}

export function moveNode(
    tree: FileNode[],
    nodeId: string,
    targetFolderId: string | null
): FileNode[] {
    const node = findNode(tree, nodeId);
    if (!node) return tree;
    const without = removeNode(tree, nodeId);
    return insertIntoFolder(without, targetFolderId, node);
}

export function isAncestor(tree: FileNode[], ancestorId: string, nodeId: string): boolean {
    const ancestor = findNode(tree, ancestorId);
    if (!ancestor || !ancestor.children) return false;
    return ancestor.children.some(
        (child) => child.id === nodeId || isAncestor(tree, child.id, nodeId)
    );
}

export function createFolderNode(name: string): FileNode {
    return { id: nanoid(), name, type: 'folder', children: [] };
}
