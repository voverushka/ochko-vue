import { expect, test, describe } from 'vitest'
import { Judge, Dealer, getInitialState, useHandState } from '../Game/gameState'
import cards from './mocks/mockData'
import { cardsInDeck } from '@/shared/presets'

const {
  diamondAce,
  heartAce,
  clubAce,
  spadesAce,
  spadesJack,
  clubsJack,
  clubsFive,
  diamondTwo,
  heartsFive,
  heartsTwo,
  clubs4,
  clubs10
} = cards

describe('Judge tests', () => {
  test('deal - player in BUST', () => {
    const runRulesResult = Judge(
      'deal',
      [diamondAce, heartAce], // player cards
      [clubAce, spadesAce]
    )
    expect(runRulesResult).toEqual({ winner: 'dealer', playerCounts: 22, dealerCounts: undefined })
  }),
    test('player HIT, winner undefined', () => {
      const runRulesResult = Judge(
        'hit',
        [diamondAce, clubs4, clubsFive], // player cards
        [clubAce, spadesAce]
      )
      expect(runRulesResult).toEqual({
        winner: undefined,
        playerCounts: 20,
        dealerCounts: undefined
      })
    }),
    test('player HITS and BUSTS', () => {
      const runRulesResult = Judge(
        'hit',
        [heartAce, spadesJack, clubsFive], //player cards
        [diamondAce, clubsJack]
      )
      expect(runRulesResult).toEqual({
        winner: 'dealer',
        playerCounts: 26,
        dealerCounts: undefined
      })
    }),
    test('dealer BUSTS, player WINS', () => {
      const runRulesResult = Judge(
        'stand',
        // player cards
        [heartAce, clubsFive, diamondTwo],
        [diamondAce, clubs4, clubsJack]
      )
      expect(runRulesResult).toEqual({
        winner: 'player',
        playerCounts: 18,
        dealerCounts: 25
      })
    }),
    test('dealer HITS after STAND, dealer WINS', () => {
      const runRulesResult = Judge(
        'stand',
        [clubs10, clubsFive, diamondTwo],
        [diamondAce, clubs4, heartsFive]
      )
      expect(runRulesResult).toEqual({
        winner: 'dealer',
        playerCounts: 17,
        dealerCounts: 20
      })
    }),
    test('dealer HITS after STAND, a DRAW', () => {
      const runRulesResult = Judge(
        'stand',
        [heartAce, clubsFive, diamondTwo],
        [clubAce, heartsFive, heartsTwo]
      )
      expect(runRulesResult).toEqual({
        winner: 'draw',
        playerCounts: 18,
        dealerCounts: 18
      })
    }),
    test('dealer HITS after STAND, player WINS', () => {
      const runRulesResult = Judge(
        'stand',
        [diamondAce, clubsFive, diamondTwo],
        [spadesAce, clubs4, heartsTwo]
      )
      expect(runRulesResult).toEqual({
        winner: 'player',
        playerCounts: 18,
        dealerCounts: 17
      })
    })
  test('player STANDS at initial deal, a DRAW', () => {
    const runRulesResult = Judge('stand', [spadesAce, clubs10], [spadesAce, clubs10])
    expect(runRulesResult).toEqual({
      winner: 'draw',
      playerCounts: 21,
      dealerCounts: 21
    })
  })
})

describe('getInitialState state tests', () => {
  test('get initial state return expected object', () => {
    const initialState = getInitialState()
    expect(initialState.winner).toBeUndefined()
    expect(initialState.playerCards).toEqual([])
    expect(initialState.dealerCards).toEqual([])
    expect(initialState.deck.length).toEqual(cardsInDeck)

    const otherInitialState = getInitialState()

    expect(otherInitialState).toEqual(initialState)
    expect(otherInitialState !== initialState).toBe(true)
  })
})

describe('DEALER tests', () => {
  test('deal - cards distribted correctly', () => {
    const initialState = getInitialState() // checks done above
    const stateAfterDealer = Dealer['deal']()
    expect(initialState !== stateAfterDealer).toBeTruthy() // should be clone
    expect(stateAfterDealer.dealerCards.length).toEqual(2)
    expect(stateAfterDealer.playerCards.length).toEqual(2)
    expect(stateAfterDealer.deck.length).toEqual(cardsInDeck - 4)
  })
  test('hit - player gets another card', () => {
    const initialState = getInitialState() // checks done above
    const stateAfterDealer = Dealer['hit'](getInitialState())
    expect(initialState !== stateAfterDealer).toBeTruthy() // should be clone
    expect(stateAfterDealer.dealerCards.length).toEqual(0)
    expect(stateAfterDealer.playerCards.length).toEqual(1)
    expect(stateAfterDealer.deck.length).toEqual(51)
  })
  test('stand - dealer cards less than 17', () => {
    const initialState = getInitialState() // checks done above
    // normally you cannot do that, but it is to simulate condiation
    initialState.playerCards.push(diamondAce, clubs4)
    initialState.dealerCards.push(heartAce, diamondTwo)
    const stateAfterDealer = Dealer['stand'](initialState)
    expect(initialState !== stateAfterDealer).toBeTruthy() // should be clone
    expect(stateAfterDealer.dealerCards.length).toEqual(3)
    expect(stateAfterDealer.playerCards.length).toEqual(2)
  })
  test('stand - dealer cards over 17', () => {
    const initialState = getInitialState() // checks done above
    // normally you cannot do that, but it is to simulate condition
    initialState.playerCards.push(diamondAce, clubs4)
    initialState.dealerCards.push(heartAce, clubs10)
    const stateAfterDealer = Dealer['stand'](initialState)
    expect(initialState !== stateAfterDealer).toBeTruthy() // should be clone
    expect(stateAfterDealer.dealerCards.length).toEqual(2)
    expect(stateAfterDealer.playerCards.length).toEqual(2)
  })
})

describe('useHandState tests - in isolation', () => {
  test('deal - cards distributed correctly', () => {
    const { handState, issueCommand } = useHandState()
    issueCommand('deal')
    expect(handState.value.dealerCards.length).toEqual(2)
    expect(handState.value.playerCards.length).toEqual(2)
    expect(handState.value.deck.length).toEqual(cardsInDeck - 4)
  })
  test('hit - cards distributed correctly', () => {
    const { handState, issueCommand } = useHandState()
    issueCommand('hit')
    expect(handState.value.dealerCards.length).toEqual(0)
    expect(handState.value.playerCards.length).toEqual(1)
    expect(handState.value.deck.length).toEqual(cardsInDeck - 1)
  })
  test('hit - cards distributed correctly', () => {
    const { handState, issueCommand } = useHandState()
    issueCommand('stand')
    expect(handState.value.dealerCards.length).toEqual(1) // he has 0 points
    expect(handState.value.playerCards.length).toEqual(0)
    expect(handState.value.deck.length).toEqual(cardsInDeck - 1)
  })
})
