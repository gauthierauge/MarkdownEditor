import type { PropsWithChildren, ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'

type PanelProps = PropsWithChildren<{
  actions?: ReactNode
  className?: string
  description?: string
  title: string
}>

function Panel({ actions, children, className = '', description, title }: PanelProps) {
  return (
    <Card className={cn('ui-panel', className)}>
      <CardHeader className="ui-panel__header">
        <div>
          <CardTitle className="ui-panel__title">{title}</CardTitle>
          {description ? (
            <CardDescription className="ui-panel__description">
              {description}
            </CardDescription>
          ) : null}
        </div>
        {actions ? <div className="ui-panel__actions">{actions}</div> : null}
      </CardHeader>
      <CardContent className="ui-panel__body">{children}</CardContent>
    </Card>
  )
}

export default Panel
