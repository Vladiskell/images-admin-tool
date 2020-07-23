import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { AppContextConsumer } from '../../context/AppContext'
import { Image } from '../Image'
import { CardForm } from '../CardForm'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
    title: {
        padding: 16,
        textAlign: 'center',
        backgroundColor: theme.palette.grey['100'],
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '400px 300px',
        gridGap: 16,
        padding: '0 16px',
        '@media (max-width: 900px)': {
            gridTemplateColumns: '350px 250px',
        },
        '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(1, 80vw)',
        },
    },
    image: {
        padding: '16px 0',
        '@media (max-width: 768px)': {
            height: '450px',
        },
        '@media (max-width: 600px)': {
            height: '350px',
        },
    },
}))

// component
// -------------------------------------------------------------
export const EditCardModal = () => {
    const classes = useStyles()

    return (
        <AppContextConsumer>
            {(context) => (
                <Dialog open={context.cardModalDisplay} onClose={context.setCardModalDisplay}>
                    <DialogTitle className={classes.title} id="card-modal-title">
                        {'Edit card and tooltip'}
                    </DialogTitle>
                    <DialogContent className={classes.content}>
                        <div className={classes.image}>
                            <Image url={context.imageUrl} />
                        </div>
                        <CardForm onFormSubmit={context.editCurrentCard} uploadRequired={false} deleteButton={true} />
                    </DialogContent>
                </Dialog>
            )}
        </AppContextConsumer>
    )
}
