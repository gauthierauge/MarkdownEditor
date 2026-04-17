import { createContext } from 'react';

interface DragContextValue {
    getDraggedId: () => string | null;
    setDragged: (id: string) => void;
    clearDragged: () => void;
}

export const DragContext = createContext<DragContextValue | null>(null);
