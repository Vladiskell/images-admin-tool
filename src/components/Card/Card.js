import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import ButtonBase from '@material-ui/core/ButtonBase'
import Paper from '@material-ui/core/Paper'

import { AppContextConsumer } from '../../context/AppContext'
import { Image } from '../Image'
import { Tooltip } from '../Tooltip'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles(() => ({
    card: {
        position: 'relative',
    },
    button: {
        width: '100%',
        height: 400,
        '@media (max-width: 1280px)': {
            height: '350px',
        },
        '@media (max-width: 960px)': {
            height: '400px',
        },
        '@media (max-width: 768px)': {
            height: '350px',
        },
        '@media (max-width: 600px)': {
            heigh: '550px',
        },

        '&:hover div': {
            opacity: 1,
        },
    },
    button__bg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: '999',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        transition: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        opacity: 0,
        color: '#fff',
        fontSize: 20,
    },
}))

// component
// -------------------------------------------------------------
export const Card = ({ item }) => {
    const classes = useStyles()
    const button = useRef()

    return (
        <AppContextConsumer>
            {(context) => (
                <Tooltip
                    title={item.tooltip.title}
                    textColor={item.tooltip.textColor}
                    bgColor={item.tooltip.bgColor}
                    placement={item.tooltip.placement}
                >
                    <Paper className={classes.card}>
                        <ButtonBase
                            className={clsx(classes.button, 'card-button')}
                            ref={button}
                            data-id={item.id}
                            onClick={(e) => {
                                const currentCardID = e.currentTarget.dataset.id
                                context.setCurrentCard(currentCardID)
                                context.setCardModalDisplay()
                            }}
                        >
                            <div className={classes.button__bg}>Edit card</div>
                            <Image url={item.image}></Image>
                        </ButtonBase>
                    </Paper>
                </Tooltip>
            )}
        </AppContextConsumer>
    )
}
