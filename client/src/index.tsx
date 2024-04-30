import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
import App from './App.tsx'
import ErrorBoundary from './app/providers/ErrorBoundary'
import './index.css'
import { LoadingSpinnerPage } from './pages/LoadingSpinnerPage'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { Provider } from 'react-redux'
import { store } from './__redux__/store.ts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingSpinnerPage />}>
      <ErrorBoundary>
          <Provider store={store}>
            <App />
          </Provider>
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>
)
