import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'

import { AppContextConsumer } from '../../context/AppContext'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
    },
}))

// component
// -------------------------------------------------------------
export const TooltipControls = () => {
    const classes = useStyles()

    return (
        <AppContextConsumer>
            {(context) => (
                <React.Fragment>
                    <FormControl className={classes.formControl}>
                        <Input
                            // id="title"
                            value={context.tooltipTitle || ''}
                            required={true}
                            placeholder={'enter some title'}
                            onChange={(e) => context.setTooltipTitle(e.target.value)}
                            aria-describedby="title"
                        />
                        <FormHelperText id="tooltip-title">title</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={context.tooltipTextColor}
                            onChange={(e) => context.setTooltipTextColor(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'text-color' }}
                        >
                            {context.colors.map((item) => (
                                <MenuItem value={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>text color</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={context.tooltipBgColor}
                            onChange={(e) => context.setTooltipBgColor(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'background-color' }}
                        >
                            {context.colors.map((item) => (
                                <MenuItem value={item.name} key={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>background color</FormHelperText>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Select
                            value={context.tooltipPlacement}
                            onChange={(e) => context.setTooltipPlacement(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'placement' }}
                        >
                            {context.placements.map((item) => (
                                <MenuItem value={item} key={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>placement</FormHelperText>
                    </FormControl>
                </React.Fragment>
            )}
        </AppContextConsumer>
    )
}
