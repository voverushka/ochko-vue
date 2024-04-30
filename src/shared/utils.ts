import { cardFaceSettings, cardTypes } from './presets'
import type { Deck, CardFace, CardType } from './types'

// it should initialise deck only once
const deckInit = (): { getInitialDeck: () => Deck } => {
  const deck: Deck = []
  Object.keys(cardFaceSettings).forEach((cardName) => {
    for (let i = 0; i < cardTypes.length; i++) {
      deck.push({
        face: cardName as CardFace,
        type: cardTypes[i] as CardType
      })
    }
  })
  return {
    getInitialDeck: () => deck
  }
}

export const deck = deckInit()

export const shuffle = (cards: Deck) => {
  const shuffled = [...cards]
  shuffled.sort(() => Math.random() - 0.5)
  return shuffled
}

export const calcPoints = (cards: Deck) => {
  return cards.reduce((acc, current) => {
    const [points] = cardFaceSettings[current.face]
    return acc + points
  }, 0)
}

export default {
  deck,
  shuffle,
  calcPoints
}
