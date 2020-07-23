import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app'
import { AppContextProvider } from './context/AppContext'
import * as serviceWorker from './serviceWorker'

const app = (
    <AppContextProvider>
        <App />
    </AppContextProvider>
)

ReactDOM.render(app, document.getElementById('root'))

serviceWorker.unregister()
