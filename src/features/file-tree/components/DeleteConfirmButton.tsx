import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'

interface DeleteConfirmButtonProps {
    label: string
    onConfirm: () => void
}

export function DeleteConfirmButton({ label, onConfirm }: DeleteConfirmButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="p-0.5 rounded hover:bg-destructive hover:text-destructive-foreground text-xs"
                title="Supprimer"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                <Trash2 className="w-3.5 h-3.5" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer « {label} » ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {label.includes('.') ? 'Ce fichier sera définitivement supprimé.' : 'Ce dossier et tout son contenu seront définitivement supprimés.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={onConfirm}
                    >
                        Supprimer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
