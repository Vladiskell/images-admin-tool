import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import FormControl from '@material-ui/core/FormControl'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import { ButtonBase } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { green } from '@material-ui/core/colors'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { AppContextConsumer } from '../../context/AppContext'
import { TooltipControls } from '../TooltipControls'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles((progress) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 16,

        '& > div:not(:last-child)': {
            marginBottom: 12,
        },
    },
    buttons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridGap: 12,
        marginLeft: -16,
        marginRight: -16,
        marginTop: 'auto',
        padding: 16,

        '& > div:first-child': {
            position: 'absolute',
            bottom: '100%',
            top: -8,
            right: 16,
            left: 16,

            '& p': {
                textAlign: 'right',
            },

            '& .MuiLinearProgress-bar': {
                backgroundColor: green[500],
            },
        },

        '& button': {
            width: '100%',

            '& > div': {
                width: '100%',
            },
        },

        '& label > div': {
            width: '100%',
        },
    },
    deleteButton: {
        backgroundColor: '#e53935',
        color: '#fff',

        '&:hover': {
            backgroundColor: '#a02725',
        },
    },
    uploadButton: {
        position: 'relative',

        '& > input': {
            position: 'absolute',
            bottom: 0,
            opacity: 0,
            zIndex: -1,
        },

        '& > label > div': {
            position: 'static',
            background: `linear-gradient(to right, #00c853 ${progress}%, #fff ${progress}%) !important`,
        },
    },
    buttonSuccess: {
        backgroundColor: green[500],
        color: '#fff',

        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))

// component
// -------------------------------------------------------------
export const CardForm = ({ onFormSubmit, uploadRequired, deleteButton }) => {
    const classes = useStyles()
    const inputFile = useRef(null)

    return (
        <AppContextConsumer>
            {(context) => (
                <form action={''} className={classes.form} autoComplete="off" onSubmit={onFormSubmit}>
                    <TooltipControls />
                    <FormControl className={classes.buttons}>
                        <Box display={context.progress === 0 ? 'none' : 'flex'} alignItems="center">
                            <Box width="100%" mr={1}>
                                <LinearProgress variant="determinate" value={context.progress} />
                            </Box>
                            <Box minWidth={35}>
                                <Typography variant="body2" color="textSecondary">{`${context.progress}%`}</Typography>
                            </Box>
                        </Box>

                        <div className={classes.uploadButton}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                required={uploadRequired}
                                ref={inputFile}
                                onChange={() => {
                                    context.uploadImage(inputFile.current.files[0])
                                }}
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    color={'secondary'}
                                    variant={'contained'}
                                    component={'div'}
                                    startIcon={<CloudUploadIcon />}
                                    disabled={context.progress !== 0 && context.progress !== 100 ? true : false}
                                    className={clsx({
                                        [classes.buttonSuccess]: context.progress === 100,
                                    })}
                                >
                                    {context.progress === 100 ? 'Uploaded' : 'upload image'}
                                </Button>
                            </label>
                        </div>

                        <ButtonBase className={'save-button'} type={'submit'}>
                            <Button
                                color={'primary'}
                                variant={'contained'}
                                component={'div'}
                                startIcon={<SaveIcon />}
                                disabled={context.progress !== 0 && context.progress !== 100 ? true : false}
                            >
                                Save and close
                            </Button>
                        </ButtonBase>
                        {deleteButton && (
                            <ButtonBase className={'delete-button'} type={'submit'}>
                                <Button
                                    className={classes.deleteButton}
                                    variant={'contained'}
                                    component={'div'}
                                    startIcon={<DeleteIcon />}
                                    onClick={context.deleteCurrentCard}
                                >
                                    Delete card
                                </Button>
                            </ButtonBase>
                        )}
                    </FormControl>
                </form>
            )}
        </AppContextConsumer>
    )
}
