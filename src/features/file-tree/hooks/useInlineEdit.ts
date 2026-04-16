import React, { useRef, useState } from 'react'

export function useInlineEdit(initialValue: string, onCommit: (value: string) => void) {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(initialValue)
    const inputRef = useRef<HTMLInputElement>(null)

    const start = (e: React.MouseEvent) => {
        e.stopPropagation()
        setValue(initialValue)
        setEditing(true)
        setTimeout(() => inputRef.current?.select(), 0)
    }

    const commit = () => {
        onCommit(value || initialValue)
        setEditing(false)
    }

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') setEditing(false)
    }

    return { editing, value, setValue, inputRef, start, commit, handleKey }
}
