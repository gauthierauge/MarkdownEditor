# MarkdownEditor

Projet réalisé par Gauthier AUGE, Lorenzo PORRETTI, Jessica LEJEUNE.

Éditeur Markdown avec une bibliothèque de blocs réutilisables et un explorateur de fichiers. L'idée c'est de pouvoir écrire du Markdown, gérer ses fichiers dans une arborescence, et avoir des "blocs" de contenu pré-écrits qu'on peut insérer en un clic.

## Stack

- React 19 + TypeScript
- Vite
- Redux Toolkit + redux-persist (state persistée dans le localStorage)
- Tailwind CSS + shadcn
- Lucide React pour les icônes
- Marked + DOMPurify pour le rendu Markdown

## Lancer le projet

```bash
npm install
npm run dev
```

## Ce qu'il faut savoir

**Persistance** : la state Redux est persistée dans le localStorage via redux-persist.

**Blocs** : les blocs sont des snippets Markdown nommés qu'on peut créer/éditer/supprimer depuis la sidebar de droite. On peut leur assigner un raccourci clavier et les insérer dans l'éditeur via le menu "+ Bloc".

**Explorateur de fichiers** : l'arborescence est entièrement gérée côté state (pas de vrai système de fichiers). On peut créer, renommer, supprimer et déplacer des fichiers/dossiers par drag & drop.

**Import/Export** : les blocs s'exportent au format .mdlc (JSON). Le markdown de l'éditeur s'exporte en .md.

## Structure du projet

```
src/
  features/
    block-editor/     # bibliothèque de blocs (CRUD, import/export, raccourcis)
    file-tree/        # explorateur de fichiers (arborescence, drag & drop)
    image-library/    # bibliothèque d'images (CRUD, import/export)
    markdown-editor/  # éditeur + aperçu Markdown
  shared/
    components/       # composants UI partagés
    context/          # contextes React (drag, insert)
    store/            # Redux store + slices
```

