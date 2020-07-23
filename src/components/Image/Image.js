import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles(() => ({
    image: {
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
}))

// component
// -------------------------------------------------------------
export const Image = ({ url }) => {
    const classes = useStyles()

    return <div className={classes.image} style={{ backgroundImage: `url('${url}')` }}></div>
}
