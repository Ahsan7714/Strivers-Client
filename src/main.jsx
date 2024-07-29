import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { AuthPopUpProvider } from './Context/AuthPopUpContext.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
     <AuthPopUpProvider>
      <App />
      <Toaster toastOptions={{
      position: 'top-center',
      style: {
        background: 'white',
        color: 'black'
      }
    }} />
      </AuthPopUpProvider>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
