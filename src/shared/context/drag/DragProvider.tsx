import { useRef, useCallback, type ReactNode } from 'react';
import { DragContext } from './DragContext';

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
