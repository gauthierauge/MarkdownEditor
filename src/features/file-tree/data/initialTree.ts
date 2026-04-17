import type { FileNode } from '@/features/file-tree/types/FileTree.types';

export const initialTree: FileNode[] = [
    {
        id: '1',
        name: 'Documentation',
        type: 'folder',
        children: [
            {
                id: '2',
                name: 'Guide de démarrage',
                type: 'folder',
                children: [
                    { id: '3', name: 'Introduction.md', type: 'file' },
                    { id: '4', name: 'Installation.md', type: 'file' },
                    { id: '5', name: 'Configuration.md', type: 'file' },
                ],
            },
            {
                id: '6',
                name: 'Référence API',
                type: 'folder',
                children: [
                    { id: '7', name: 'Endpoints.md', type: 'file' },
                    { id: '8', name: 'Authentification.md', type: 'file' },
                    { id: '9', name: 'Erreurs.md', type: 'file' },
                ],
            },
            { id: '10', name: 'FAQ.md', type: 'file' },
            { id: '11', name: 'Changelog.md', type: 'file' },
        ],
    },
    {
        id: '12',
        name: 'Notes de projet',
        type: 'folder',
        children: [
            { id: '13', name: 'Réunion 2026-04-10.md', type: 'file' },
            { id: '14', name: 'Réunion 2026-04-17.md', type: 'file' },
            {
                id: '15',
                name: 'Spécifications',
                type: 'folder',
                children: [
                    { id: '16', name: 'Maquettes.md', type: 'file' },
                    { id: '17', name: 'User stories.md', type: 'file' },
                ],
            },
        ],
    },
    {
        id: '18',
        name: 'Articles',
        type: 'folder',
        children: [
            { id: '19', name: 'Brouillon — Architecture hexagonale.md', type: 'file' },
            { id: '20', name: 'Publié — Introduction à Vite.md', type: 'file' },
        ],
    },
    { id: '21', name: 'README.md', type: 'file' },
    { id: '22', name: 'CONTRIBUTING.md', type: 'file' },
];
