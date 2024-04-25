// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Input} from "@nextui-org/react";
import {NextUIProvider} from '@nextui-org/react'
import App from './App'
import './index.css'
import 'shepherd.js/dist/css/shepherd.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    <main className="dark">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
)