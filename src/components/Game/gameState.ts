import { ref } from 'vue'
import cloneDeep from 'lodash.clonedeep'
import type { GameState, JudgeFunction, Command, Deck, GameResult } from '../../shared/types'
import { shuffle, calcPoints, deck } from '../../shared/utils'
import { dealerLimit, winningPoints } from '../../shared/presets'

export const getInitialState = (): GameState => {
  const initialGameState: GameState = {
    winner: undefined,
    dealerCards: [],
    playerCards: [],
    deck: deck.getInitialDeck()
  }
  return cloneDeep(initialGameState)
}

export const isBust = (points: number) => points > winningPoints

export const Judge: Record<Command, JudgeFunction> = {
  deal: (playerCards: Deck, dealerCards: Deck): GameResult | undefined => {
    // both could get 2 aces
    const dealerPoints = calcPoints(dealerCards)
    const playerPoints = calcPoints(playerCards)
    const isBustPlayer = isBust(playerPoints)
    const isBustDealer = isBust(dealerPoints)
    if (!isBustPlayer && !isBustDealer) {
      return undefined // play futher
    }
    // both has 2 aces
    return isBustPlayer && isBustDealer ? 'bust' : isBustDealer ? 'player' : 'dealer'
  },

  hit: (playerCards: Deck): GameResult | undefined => {
    const inBustState = isBust(calcPoints(playerCards))
    return inBustState ? 'dealer' : undefined
  },

  stand: (playerCards: Deck, dealerCards: Deck): GameResult => {
    const dealerPoints = calcPoints(dealerCards)
    const playerPoints = calcPoints(playerCards)

    if (isBust(dealerPoints)) {
      return 'player'
    }
    if (playerPoints === dealerPoints) {
      return 'draw'
    }
    return winningPoints - playerPoints < winningPoints - dealerPoints ? 'player' : 'dealer'
  }
}

export const Dealer = {
  deal: () => {
    const newState: GameState = getInitialState()
    newState.deck = shuffle(newState.deck)
    newState.playerCards = [newState.deck.pop()!, newState.deck.pop()!]
    newState.dealerCards = [newState.deck.pop()!, newState.deck.pop()!]
    newState.dealerCards[1].closed = true
    return newState
  },

  hit: (state: GameState) => {
    const newState = cloneDeep(state)
    const cardOut = newState.deck.pop()
    cardOut && newState.playerCards.push(cardOut)
    return newState
  },
  stand: (state: GameState) => {
    const newState = cloneDeep(state)

    newState.dealerCards[1].closed = false
    if (calcPoints(newState.dealerCards) <= dealerLimit) {
      const cardOut = newState.deck.pop()
      cardOut && newState.dealerCards.push(cardOut)
    }
    return newState
  }
}

export const useHandState = () => {
  const handState = ref(getInitialState())

  function issueCommand(command: Command) {
    const newState: GameState = Dealer[command](handState.value)
    if (command in Judge) {
      newState.winner = Judge[command](newState.playerCards, newState.dealerCards)
      if (newState.winner !== undefined) {
        newState.dealerCards[1].closed = false
      }
    }
    handState.value = newState
  }
  return {
    handState,
    issueCommand
  }
}
