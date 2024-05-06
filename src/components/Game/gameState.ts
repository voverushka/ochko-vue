import { ref } from 'vue'
import cloneDeep from 'lodash.clonedeep'
import type { GameState, JudgeFunction, Command, Deck, Winner, GameResult } from '@/shared/types'
import { shuffle, calcPoints, deck } from '@/shared/utils'
import { dealerLimit, winningPoints } from '@/shared/presets'

export const getInitialState = (): GameState => {
  const initialGameState: GameState = {
    winner: undefined,
    playerCounts: 0,
    dealerCounts: undefined,
    dealerCards: [],
    playerCards: [],
    deck: deck.getInitialDeck()
  }
  return cloneDeep(initialGameState)
}

export const isBust = (points: number) => points > winningPoints

export const Judge = (
  command: Command,
  playerCards: Deck,
  dealerCards: Deck
): GameResult | undefined => {
  switch (command) {
    case 'deal': {
      const playerCounts = calcPoints(playerCards)
      const winner = isBust(playerCounts) ? 'dealer' : undefined
      return {
        playerCounts,
        dealerCounts: undefined,
        winner
      }
    }
    case 'hit': {
      const playerCounts = calcPoints(playerCards)
      const winner = isBust(playerCounts) ? 'dealer' : undefined
      return {
        playerCounts,
        dealerCounts: undefined,
        winner
      }
    }
    case 'stand': {
      const dealerCounts = calcPoints(dealerCards)
      const playerCounts = calcPoints(playerCards)

      const winner: Winner = isBust(dealerCounts)
        ? 'player'
        : playerCounts === dealerCounts
          ? 'draw'
          : winningPoints - playerCounts < winningPoints - dealerCounts
            ? 'player'
            : 'dealer'

      return {
        playerCounts,
        dealerCounts,
        winner
      }
    }
    default:
      undefined
  }
}

export const Dealer = {
  deal: () => {
    const newState: GameState = getInitialState()
    newState.deck = shuffle(newState.deck)
    if (newState.deck.length < 4) {
      // not possinbe case now, but just in case - sanity check
      console.error('Deal is called with not full deck')
      return newState
    }
    newState.playerCards = [newState.deck.pop()!, newState.deck.pop()!]
    newState.dealerCards = [newState.deck.pop()!, newState.deck.pop()!]
    newState.dealerCards[1].closed = true
    return newState
  },

  hit: (state: GameState) => {
    const newState = { ...state }
    newState.deck = [...state.deck]
    newState.playerCards = [...state.playerCards]
    const cardOut = newState.deck.pop()
    if (cardOut) {
      newState.playerCards.push(cardOut)
    } else {
      console.error('No cards remaining in the deck.') // unrealistic case
    }
    return newState
  },
  stand: (state: GameState) => {
    const newState = { ...state }
    newState.deck = [...state.deck]
    newState.dealerCards = [...state.dealerCards]

    // sanity
    if (newState.dealerCards.length > 1) {
      newState.dealerCards[1] = {
        ...newState.dealerCards[1],
        closed: false
      }
    }
    if (calcPoints(newState.dealerCards) <= dealerLimit) {
      const cardOut = newState.deck.pop()
      if (cardOut) {
        newState.dealerCards.push(cardOut)
      } else {
        console.error('No cards remaining in the deck.') // unrealistic case
      }
    }
    return newState
  }
}

export const useHandState = () => {
  const handState = ref(getInitialState())

  function issueCommand(command: Command) {
    let newState: GameState = Dealer[command](handState.value)

    const justdgeResult = Judge(command, newState.playerCards, newState.dealerCards)
    if (justdgeResult !== undefined) {
      const { winner, playerCounts } = justdgeResult
      if (winner !== undefined && newState.dealerCards.length > 1 /* sanity */) {
        newState.dealerCards[1].closed = false
        newState.dealerCounts = newState.dealerCounts ?? calcPoints(newState.dealerCards)
      }
      newState = Object.assign(newState, { winner, playerCounts })
    }
    handState.value = newState
  }
  return {
    handState,
    issueCommand
  }
}
