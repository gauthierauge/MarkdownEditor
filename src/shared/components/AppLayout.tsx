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
        <nav aria-label="Navigation principale" className="app-nav">
          <NavLink className={getLinkClassName} to={`/files/${currentFileId}`}>
            <span>Fichier actif</span>
            <small>{currentFileId}</small>
          </NavLink>
          <NavLink className={getLinkClassName} to="/blocks">
            <span>Blocs</span>
          </NavLink>
          <NavLink className={getLinkClassName} to="/images">
            <span>Images</span>
            <small>{images.length} en bibliotheque</small>
          </NavLink>
        </nav>
      </aside>

      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
