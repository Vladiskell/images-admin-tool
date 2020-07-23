import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { createPortal } from 'react-dom'

import { AppContextConsumer } from '../../context/AppContext'

// styles
// -------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
    cardTooltip: {
        position: 'absolute',
        willChange: 'transform',
        top: 0,
        left: 0,
        zIndex: 9999,
        maxWidth: '300px',
        textAlign: 'center',
        padding: '8px 16px',
        borderRadius: 6,
        fontSize: 14,
        lineHeight: '1.15',
        pointerEvents: 'none',
        boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        '@media (max-width: 768px)': {
            maxWidth: '160px',
        },
    },
}))

// component
// -------------------------------------------------------------
const Tooltip = ({ title, textColor, bgColor, placement, children, cardCoordinate, colors }) => {
    const classes = useStyles()
    const tooltip = useRef(document.getElementById(`tooltip`) || document.createElement('div'))
    const [isTooltip] = useState(!tooltip.current.parentElement)

    useEffect(() => {
        if (isTooltip) {
            tooltip.current.id = `tooltip`
            tooltip.current.innerHTML = title
            tooltip.current.classList.add(classes.cardTooltip)

            document.body.appendChild(tooltip.current)

            // get tooltip sizes
            const tooltipWidth = tooltip.current.offsetWidth
            const tooltipHeight = tooltip.current.offsetHeight

            // init tooltip position as empty object
            const tooltipPosition = {}

            // check tooltip placement and set coordinate in tooltip position object
            switch (placement) {
                case 'top':
                    tooltipPosition.translateX = cardCoordinate.x + (cardCoordinate.width / 2 - tooltipWidth / 2)
                    tooltipPosition.translateY = cardCoordinate.y - tooltipHeight - 8
                    break
                case 'bottom':
                    tooltipPosition.translateX = cardCoordinate.x + (cardCoordinate.width / 2 - tooltipWidth / 2)
                    tooltipPosition.translateY = cardCoordinate.y + cardCoordinate.height + 8
                    break
                case 'left':
                    tooltipPosition.translateX = cardCoordinate.x - tooltipWidth - 8
                    tooltipPosition.translateY = cardCoordinate.y + (cardCoordinate.height / 2 - tooltipHeight / 2)
                    break
                case 'right':
                    tooltipPosition.translateX = cardCoordinate.x + cardCoordinate.width + 8
                    tooltipPosition.translateY = cardCoordinate.y + (cardCoordinate.height / 2 - tooltipHeight / 2)
                    break
                default:
                    tooltipPosition.translateX = 0
                    tooltipPosition.translateY = 0
            }

            // check limit coordinate and fix tooltip position
            if (tooltipPosition.translateX + tooltipWidth >= window.innerWidth) {
                tooltipPosition.translateX = cardCoordinate.right - tooltipWidth
            } else if (tooltipPosition.translateX <= 0) {
                tooltipPosition.translateX = cardCoordinate.left
            } else if (tooltipPosition.translateY >= window.innerHeight) {
                tooltipPosition.translateY = window.innerHeight - 12
            } else if (tooltipPosition.translateY <= 0) {
                tooltipPosition.translateY = window.innerHeight + 12
            }

            // get tooltip color
            const getCurrentColor = (color) => {
                const result = colors.find((item) => item.name === color)
                return result.value
            }

            // set tooltip inline styles
            tooltip.current.style.cssText = `
                transform: translate3d(${tooltipPosition.translateX}px, ${tooltipPosition.translateY}px, 0px);
                color: ${getCurrentColor(textColor)};
                background-color: ${getCurrentColor(bgColor)};
            `
        }
        return () => {
            if (isTooltip && tooltip.current.parentElement) {
                tooltip.current.parentElement.removeChild(tooltip.current)
            }
        }
    }, [
        bgColor,
        cardCoordinate.bottom,
        cardCoordinate.height,
        cardCoordinate.left,
        cardCoordinate.right,
        cardCoordinate.top,
        cardCoordinate.width,
        cardCoordinate.x,
        cardCoordinate.y,
        classes.cardTooltip,
        colors,
        isTooltip,
        placement,
        textColor,
        title,
    ])
    return createPortal(children, tooltip.current)
}

export const TooltipWrapper = ({ title, textColor, bgColor, placement, children }) => {
    const [tooltipDisplay, setTooltipDisplay] = useState(false)
    const [cardCoordinate, setCardCoordinate] = useState('')

    return (
        <AppContextConsumer>
            {(context) => (
                <React.Fragment>
                    {tooltipDisplay && (
                        <Tooltip
                            title={title}
                            textColor={textColor}
                            bgColor={bgColor}
                            placement={placement}
                            cardCoordinate={cardCoordinate}
                            colors={context.colors}
                        />
                    )}
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            onMouseOver: (e) => {
                                const coordinate = e.currentTarget.getBoundingClientRect()
                                setCardCoordinate(coordinate)
                                setTooltipDisplay(!tooltipDisplay)
                            },
                            onMouseOut: () => setTooltipDisplay(!tooltipDisplay),
                        })
                    })}
                </React.Fragment>
            )}
        </AppContextConsumer>
    )
}
