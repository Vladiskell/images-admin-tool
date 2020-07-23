import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { AppContextConsumer } from '../../context/AppContext'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: '#4c4f54',
        '@media (max-width: 426px)': {
            height: 'auto',
        },
    },
    logo: {
        '@media (max-width: 426px)': {
            display: 'none',
        },
    },
    addCard: {
        marginLeft: 'auto',
        '@media (max-width: 426px)': {
            width: '100%',

            '& > button': {
                width: '100%',
            },
        },
    },
    button: {
        backgroundColor: theme.palette.secondary.main,
    },
}))

// component
// -------------------------------------------------------------
export const Header = () => {
    const classes = useStyles()
    return (
        <AppContextConsumer>
            {(context) => (
                <AppBar className={classes.header} position="static">
                    <Toolbar>
                        <Container>
                            <Grid container spacing={2}>
                                <Grid item className={classes.logo}>
                                    <Typography variant={'h6'} component={'span'}>
                                        Images Admin Tool
                                    </Typography>
                                </Grid>
                                <Grid className={classes.addCard} item>
                                    <Button
                                        variant={'contained'}
                                        className={classes.button}
                                        startIcon={<AddCircleIcon />}
                                        onClick={() => {
                                            context.resetFormValues()
                                            context.setAddCardModalDisplay()
                                        }}
                                    >
                                        Add new card
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            )}
        </AppContextConsumer>
    )
}
