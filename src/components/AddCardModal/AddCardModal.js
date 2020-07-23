import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

import { AppContextConsumer } from '../../context/AppContext'
import { CardForm } from '../CardForm'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
    modal: {},
    title: {
        padding: 16,
        textAlign: 'center',
        backgroundColor: theme.palette.grey['100'],
        marginBottom: 24,
    },
    content: {
        width: 400,
        padding: '0 16px',
        '@media (max-width: 600px)': {
            width: '80vw',
            maxWidth: '80vw',
        },
    },
}))

// component
// -------------------------------------------------------------
export const AddCardModal = () => {
    const classes = useStyles()

    return (
        <AppContextConsumer>
            {(context) => (
                <Dialog
                    open={context.addCardModalDisplay}
                    className={classes.modal}
                    onClose={() => context.setAddCardModalDisplay()}
                >
                    <DialogTitle className={classes.title} id="add-card-modal-title">
                        {'Add new image card'}
                    </DialogTitle>
                    <DialogContent className={classes.content}>
                        <CardForm onFormSubmit={context.addNewCard} uploadRequired={true} />
                    </DialogContent>
                </Dialog>
            )}
        </AppContextConsumer>
    )
}
