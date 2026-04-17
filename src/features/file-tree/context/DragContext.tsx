import { createContext, useCallback, useRef, type ReactNode } from 'react';

export interface DragContextValue {
    getDraggedId: () => string | null;
    setDragged: (id: string) => void;
    clearDragged: () => void;
}

export const DragContext = createContext<DragContextValue | null>(null);

export function DragProvider({ children }: { children: ReactNode }) {
    const draggedNodeIdRef = useRef<string | null>(null);
    const getDraggedId = useCallback(() => draggedNodeIdRef.current, []);
    const setDragged = useCallback((id: string) => { draggedNodeIdRef.current = id; }, []);
    const clearDragged = useCallback(() => { draggedNodeIdRef.current = null; }, []);
    return (
        <DragContext.Provider value={{ getDraggedId, setDragged, clearDragged }}>
            {children}
        </DragContext.Provider>
    );
}
