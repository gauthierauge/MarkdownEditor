import { useContext } from 'react'
import { DragContext } from '../context/dragContext'

export function useDragContext() {
    const ctx = useContext(DragContext)
    if (!ctx) throw new Error('useDragContext must be used within DragProvider')
    return ctx
}