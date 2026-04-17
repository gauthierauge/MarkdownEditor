import { Button } from '@/shared/components/ui/button';
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
} from '@/shared/components/ui/alert-dialog';

type Props = {
  blockName: string;
  onConfirm: () => void;
};

export default function DeleteBlockDialog({ blockName, onConfirm }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={
        <Button variant="destructive" size="sm">
          Supprimer
        </Button>
      } />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le bloc</AlertDialogTitle>
          <AlertDialogDescription>
            Le bloc &laquo;&nbsp;{blockName || 'sans nom'}&nbsp;&raquo; sera supprimé définitivement.
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
