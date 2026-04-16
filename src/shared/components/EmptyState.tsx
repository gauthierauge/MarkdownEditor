type EmptyStateProps = {
  description: string
  title: string
}

function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
    </div>
  )
}

export default EmptyState
