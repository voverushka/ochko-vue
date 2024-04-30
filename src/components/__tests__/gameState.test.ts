import { expect, test, describe } from 'vitest'
import { Judge, Dealer, getInitialState } from '../Game/gameState'
import cards from './mocks/mockData'
import { cardsInDeck } from '../../shared/presets'

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
  test('deal - both BUST', () => {
    const runRulesResult = Judge['deal']([diamondAce, heartAce], [clubAce, spadesAce])
    expect(runRulesResult).toBe('bust')
  }),
    test('player HIT, all ok', () => {
      const runRulesResult = Judge['hit']([diamondAce, spadesJack], [clubAce, spadesAce])
      expect(runRulesResult).toBeUndefined()
    }),
    test('player HIT and BUST', () => {
      const runRulesResult = Judge['hit'](
        [heartAce, spadesJack, clubsFive],
        [diamondAce, clubsJack, spadesJack]
      )
      expect(runRulesResult).toEqual('dealer')
    }),
    test('dealer STAND, player WINS', () => {
      const runRulesResult = Judge['stand'](
        [heartAce, clubsFive, diamondTwo],
        [diamondAce, spadesJack, clubsJack]
      )
      expect(runRulesResult).toEqual('player')
    }),
    test('dealer HITS, dealer WINS', () => {
      const runRulesResult = Judge['stand'](
        [heartAce, clubsFive, diamondTwo],
        [diamondAce, spadesJack]
      )
      expect(runRulesResult).toEqual('dealer')
    }),
    test('dealer hits after STAND, a DRAW', () => {
      const runRulesResult = Judge['stand'](
        [heartAce, clubsFive, diamondTwo],
        [clubAce, heartsFive, heartsTwo]
      )
      expect(runRulesResult).toEqual('draw')
    }),
    test('dealer hits afyer STAND, player wins', () => {
      const runRulesResult = Judge['stand'](
        [diamondAce, clubsFive, diamondTwo],
        [spadesAce, clubs4, heartsTwo]
      )
      expect(runRulesResult).toEqual('player')
    })
  test('a DRAW from the start (stand)', () => {
    const runRulesResult = Judge['stand']([spadesAce, clubs10], [spadesAce, clubs10])
    expect(runRulesResult).toEqual('draw')
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

describe('Dealer tests', () => {
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
