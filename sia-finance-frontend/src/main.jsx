import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import './index.css'
import App from './App'

import { store } from './app/store'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
        position='top-center'
        reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#111827",
              color: "#fff",
            },
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);