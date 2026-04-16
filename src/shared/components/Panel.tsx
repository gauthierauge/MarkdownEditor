import type { PropsWithChildren, ReactNode } from 'react'

type PanelProps = PropsWithChildren<{
  actions?: ReactNode
  className?: string
  description?: string
  title: string
}>

function Panel({ actions, children, className = '', description, title }: PanelProps) {
  return (
    <section className={['ui-panel', className].filter(Boolean).join(' ')}>
      <header className="ui-panel__header">
        <div>
          <h2 className="ui-panel__title">{title}</h2>
          {description ? (
            <p className="ui-panel__description">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="ui-panel__actions">{actions}</div> : null}
      </header>
      <div className="ui-panel__body">{children}</div>
    </section>
  )
}

export default Panel
