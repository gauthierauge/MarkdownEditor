import { useMarkdownEditor } from './hooks/useMarkdownEditor';
import { useMarkdownExport } from './hooks/useMarkdownExport';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import MarkdownPreview from '@/shared/components/MarkdownPreview';

export default function MarkdownEditor() {
    const {
        textareaRef,
        menuRef,
        openFileName,
        content,
        blocks,
        showPreview,
        showBlockMenu,
        handleChange,
        handleClose,
        togglePreview,
        toggleBlockMenu,
        handleInsertBlock,
    } = useMarkdownEditor();
    const { handleExport } = useMarkdownExport();

    return (
        <div className="flex flex-col flex-1 min-h-0 h-full">

            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30 shrink-0">
                <span className="text-sm font-medium text-foreground truncate flex-1">
                    {openFileName ?? 'Untitled'}
                </span>
                <div className="relative" ref={menuRef}>
                    <Button
                        variant="outline"
                        size="xs"
                        onClick={toggleBlockMenu}
                        title="Insérer un bloc"
                    >
                        + Bloc
                    </Button>
                    {showBlockMenu && (
                        <div className="absolute right-0 top-full mt-1 z-50 w-56 rounded-md border border-border bg-popover p-1 shadow-md">
                            {blocks.length === 0 ? (
                                <p className="px-2 py-1.5 text-xs text-muted-foreground">
                                    Aucun bloc disponible
                                </p>
                            ) : (
                                blocks.map((block) => (
                                    <button
                                        key={block.id}
                                        className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                        onClick={() => handleInsertBlock(block)}
                                    >
                                        <span className="truncate">{block.name}</span>
                                        {block.shortcut && (
                                            <Badge variant="secondary" className="ml-2 text-[10px] shrink-0">
                                                {block.shortcut}
                                            </Badge>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <Button
                    variant="outline"
                    size="xs"
                    onClick={togglePreview}
                    title={showPreview ? 'Masquer l\'aperçu' : 'Afficher l\'aperçu'}
                >
                    {showPreview ? 'Éditeur seul' : 'Aperçu'}
                </Button>
                <Button
                    variant="outline"
                    size="xs"
                    onClick={handleExport}
                    title="Exporter en .md"
                >
                    ↓ Exporter
                </Button>
                <Button
                    variant="outline"
                    size="xs"
                    onClick={handleClose}
                    title="Fermer le fichier"
                >
                    ✕ Fermer
                </Button>
            </div>

            <div className="flex flex-1 min-h-0 gap-0">
                <div className={`flex flex-col min-h-0 ${showPreview ? 'w-1/2 border-r border-border' : 'flex-1'}`}>
                    <textarea
                        ref={textareaRef}
                        className="flex-1 w-full bg-background text-foreground font-mono text-sm leading-relaxed p-4 resize-none outline-none focus:ring-0"
                        value={content}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Commencez à écrire en Markdown..."
                        spellCheck={false}
                    />
                </div>

                {showPreview && (
                    <div className="w-1/2 overflow-y-auto p-4">
                        <MarkdownPreview
                            content={content}
                            emptyMessage="L'aperçu apparaîtra ici…"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
