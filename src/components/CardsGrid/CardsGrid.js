import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { AppContextConsumer } from '../../context/AppContext'
import { Card } from '../Card'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
    imagesGrid: {
        paddingTop: 52,
    },
}))

// component
// -------------------------------------------------------------
export const CardsGrid = () => {
    const classes = useStyles()

    return (
        <AppContextConsumer>
            {(context) => (
                <section className={classes.imagesGrid}>
                    <Container>
                        <Grid container spacing={2}>
                            {context.cards.map((item) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} style={{ order: item.order }} key={item.id}>
                                        <Card item={item} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container>
                </section>
            )}
        </AppContextConsumer>
    )
}
