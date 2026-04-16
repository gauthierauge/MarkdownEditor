import { Card, CardContent } from '@/components/ui/card'

type EmptyStateProps = {
  description: string
  title: string
}

function EmptyState({ description, title }: EmptyStateProps) {
  return (
    <Card className="empty-state border-dashed bg-muted/40 shadow-none">
      <CardContent className="pt-6 text-center">
        <h3 className="empty-state__title">{title}</h3>
        <p className="empty-state__description">{description}</p>
      </CardContent>
    </Card>
  )
}

export default EmptyState
