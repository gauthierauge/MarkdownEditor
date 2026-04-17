import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { EditorInsertProvider } from './shared/context/editor-insert/EditorInsertProvider'
import { persistor, store } from './shared/store'
import './index.css'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <EditorInsertProvider>
          <App />
        </EditorInsertProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
