import type { CardFace, GameResult } from './types'

type FaceMappings = [number, string]

export const cardFaceSettings: Record<CardFace, FaceMappings> = {
  king: [10, 'K'],
  jack: [10, 'J'],
  queen: [10, 'Q'],
  ace: [11, 'A'],
  two: [2, '2'],
  three: [3, '3'],
  four: [4, '4'],
  five: [5, '5'],
  six: [6, '6'],
  seven: [7, '7'],
  eight: [8, '8'],
  nine: [9, '9'],
  ten: [10, '10']
}

export const cardTypes = ['club', 'heart', 'spade', 'diamond']

export const winningPoints = 21

export const dealerLimit = 17

export const cardsInDeck = 52

export const messages: Record<GameResult, string> = {
  draw: 'Game ended with DRAW.',
  player: 'The winner is PLAYER',
  dealer: 'The winner is DEALER'
}
