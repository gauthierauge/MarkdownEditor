import { useState, useCallback } from 'react';

export function useFileTree() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const isExpanded = useCallback(
    (nodeId: string) => expandedIds.has(nodeId),
    [expandedIds]
  );

  const expandAll = useCallback((nodeIds: string[]) => {
    setExpandedIds(new Set(nodeIds));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  return {
    isExpanded,
    toggleExpand,
    expandAll,
    collapseAll,
  };
}
