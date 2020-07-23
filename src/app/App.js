import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import './App.css'

import { Header } from '../components/Header'
import { CardsGrid } from '../components/CardsGrid'
import { AddCardModal } from '../components/AddCardModal'
import { EditCardModal } from '../components/EditCardModal'

export const App = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Header />
                <CardsGrid />
                <EditCardModal />
                <AddCardModal />
            </ThemeProvider>
        </React.Fragment>
    )
}
