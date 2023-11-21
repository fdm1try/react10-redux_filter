import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './redux/store.ts';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={configureStore()} >
      <App />
    </ReduxProvider>
  </React.StrictMode>,
)
