import React, { useState } from 'react'
import storage from '../firebase'

const { Provider, Consumer } = React.createContext()

const AppContextProvider = (props) => {
    // init context hooks
    const [cardID, setCardID] = useState('')

    const [imageUrl, setImageUrl] = useState(null)
    const [progress, setProgress] = useState(0)

    const [tooltipTitle, setTooltipTitle] = useState('')
    const [tooltipTextColor, setTooltipTextColor] = useState('white')
    const [tooltipBgColor, setTooltipBgColor] = useState('black')
    const [tooltipPlacement, setTooltipPlacement] = useState('top')

    const [cardModalDisplay, setCardModalDisplay] = useState(false)
    const [addCardModalDisplay, setAddCardModalDisplay] = useState(false)

    // init cards list
    const cards = []
    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue
        }
        let item = JSON.parse(localStorage.getItem(key))
        cards.push(item)
    }

    // init tooltip colors list
    const colors = [
        {
            name: 'white',
            value: '#fff',
        },
        {
            name: 'black',
            value: '#4c4f54',
        },
        {
            name: 'blue',
            value: '#2196f3',
        },
        {
            name: 'green',
            value: '#4caf50',
        },
        {
            name: 'red',
            value: '#dc3545',
        },
        {
            name: 'yellow',
            value: '#fdd835',
        },
        {
            name: 'purple',
            value: '#673ab7',
        },
    ]

    // init tooltip placements list
    const placements = ['top', 'left', 'right', 'bottom']

    // add new card to localstorage
    const addNewCard = (e) => {
        e.preventDefault()
        const cardsLength = localStorage.length

        const cardKey = localStorage[`image-card-${cardsLength + 1}`]
            ? `image-card-${cardsLength + 1}_1`
            : `image-card-${cardsLength + 1}`

        const orders = cards.map((item) => item.order)
        const cardOrder = Math.max.apply(null, orders) + 1

        if (progress === 100) {
            const Card = {
                id: cardKey,
                image: imageUrl,
                order: cards.length === 0 ? '0' : cardOrder,
                tooltip: {
                    title: tooltipTitle,
                    textColor: tooltipTextColor,
                    bgColor: tooltipBgColor,
                    placement: tooltipPlacement,
                },
            }

            const cardValue = JSON.stringify(Card)
            localStorage.setItem(cardKey, cardValue)
            setAddCardModalDisplay(!addCardModalDisplay)
            setProgress(0)
        }
    }

    // set current card
    const setCurrentCard = (id) => {
        const card = JSON.parse(localStorage.getItem(id))

        setCardID(id)
        setImageUrl(card.image)
        setTooltipTitle(card.tooltip.title)
        setTooltipTextColor(card.tooltip.textColor)
        setTooltipBgColor(card.tooltip.bgColor)
        setTooltipPlacement(card.tooltip.placement)
    }

    // edit current card
    const editCurrentCard = () => {
        const card = JSON.parse(localStorage.getItem(cardID))

        card.image = imageUrl
        card.tooltip.title = tooltipTitle
        card.tooltip.textColor = tooltipTextColor
        card.tooltip.bgColor = tooltipBgColor
        card.tooltip.placement = tooltipPlacement

        localStorage[cardID] = JSON.stringify(card)

        setProgress(0)

        setTimeout(() => {
            setCardModalDisplay(!cardModalDisplay)
        }, 500)
    }

    // reset tooltip controls
    const resetFormValues = () => {
        setImageUrl('')
        setTooltipTitle()
        setTooltipTextColor('white')
        setTooltipBgColor('black')
        setTooltipPlacement('top')
        setProgress(0)
    }

    // delete current card
    const deleteCurrentCard = () => {
        localStorage.removeItem(cardID)
    }

    // upload image to firebase storage
    const uploadImage = (currentImage) => {
        const uploadTask = storage.storage().ref(`images/${currentImage.name}`).put(currentImage)
        console.log(currentImage)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            },
            (error) => {
                console.log(error)
            },
            () => {
                storage
                    .storage()
                    .ref('images')
                    .child(currentImage.name)
                    .getDownloadURL()
                    .then((url) => {
                        setImageUrl(url)
                        console.log(url)
                    })
            }
        )
    }

    return (
        <Provider
            value={{
                addNewCard: addNewCard,
                setCurrentCard: (id) => setCurrentCard(id),
                editCurrentCard: editCurrentCard,
                resetFormValues: resetFormValues,
                deleteCurrentCard: deleteCurrentCard,
                uploadImage: (img) => uploadImage(img),

                cards: cards,
                colors: colors,
                placements: placements,

                progress: progress,

                cardModalDisplay: cardModalDisplay,
                setCardModalDisplay: () => setCardModalDisplay(!cardModalDisplay),

                addCardModalDisplay: addCardModalDisplay,
                setAddCardModalDisplay: () => setAddCardModalDisplay(!addCardModalDisplay),

                imageUrl: imageUrl,

                tooltipTitle: tooltipTitle,
                setTooltipTitle: (title) => setTooltipTitle(title),

                tooltipTextColor: tooltipTextColor,
                setTooltipTextColor: (color) => setTooltipTextColor(color),

                tooltipBgColor: tooltipBgColor,
                setTooltipBgColor: (color) => setTooltipBgColor(color),

                tooltipPlacement: tooltipPlacement,
                setTooltipPlacement: (placement) => setTooltipPlacement(placement),
            }}
        >
            {props.children}
        </Provider>
    )
}

export { AppContextProvider, Consumer as AppContextConsumer }
