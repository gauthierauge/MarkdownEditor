import { NavLink, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/shared/hooks'
import { selectCurrentFileId } from '@/store/editorSlice'
import { selectImages } from '@/store/imagesSlice'

function AppLayout() {
  const currentFileId = useAppSelector(selectCurrentFileId)
  const images = useAppSelector(selectImages)
  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    ['app-nav__link', isActive ? 'is-active' : ''].filter(Boolean).join(' ')

  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="brand-block">
          <p className="brand-block__eyebrow">Projet final</p>
          <h1 className="brand-block__title">Markdown Editor</h1>
          <p className="brand-block__description">
            Socle commun du groupe avec navigation, éditeur provisoire et
            bibliothèque d’images persistée.
          </p>
        </div>

        <nav aria-label="Navigation principale" className="app-nav">
          <NavLink className={getLinkClassName} to={`/files/${currentFileId}`}>
            <span>Fichier actif</span>
            <small>{currentFileId}</small>
          </NavLink>
          <NavLink className={getLinkClassName} to="/blocks">
            <span>Blocs</span>
            <small>placeholder d’intégration</small>
          </NavLink>
          <NavLink className={getLinkClassName} to="/images">
            <span>Images</span>
            <small>{images.length} en bibliothèque</small>
          </NavLink>
        </nav>

        <div className="sidebar-note">
          <p className="sidebar-note__title">Contrat provisoire</p>
          <p>
            Le bloc 3 injecte déjà du Markdown dans l’éditeur via
            <code>insertAtCursor(text)</code>.
          </p>
        </div>
      </aside>

      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
