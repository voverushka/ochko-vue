import { expect, test, describe, vi } from 'vitest'
import { calcPoints, deck, shuffle } from '@/shared/utils'
import cards from './mocks/mockData'
import type { CardType, CardFace } from '@/shared/types'

const {
  diamondAce,
  spadesJack,
  diamondTwo,
  heartsFive,
  clubs4,
  clubs10,
  spadesKing,
  spadesQueen,
  clubs3,
  clubs6,
  heart7,
  diamond8,
  diamond9
} = cards

describe('calcPoints', () => {
  test('calcPoints returns 0, when there is no deck', () => {
    expect(calcPoints([])).toEqual(0)
  })
  test('calcPoints returns 21, when there ace and 10 are involved', () => {
    expect(calcPoints([diamondAce, clubs10])).toEqual(21)
  })
  test('sum of picture cards is equal 41', () => {
    expect(calcPoints([spadesKing, spadesQueen, spadesJack, diamondAce])).toEqual(41)
  })
  test('sum of number cards is equal 41', () => {
    expect(
      calcPoints([
        diamondTwo,
        clubs3,
        clubs4,
        heartsFive,
        clubs6,
        heart7,
        diamond8,
        diamond9,
        clubs10
      ])
    ).toEqual(54)
  })
})

describe('getDeck', () => {
  test('count, types, faces are correct', () => {
    const initialDeck = deck.getInitialDeck()
    expect(initialDeck.length).toEqual(52)
    // each category should be 4 times
    const countsOfType = initialDeck.reduce<Record<CardType, number>>(
      (acc, current) => {
        acc[current.type] = acc[current.type] ?? 0
        acc[current.type]++
        return acc
      },
      {} as Record<CardType, number>
    )
    // should be 13 of each card type (heart, club, diamond, spade)
    expect(Object.values(countsOfType).every((value) => value === 13)).toBeTruthy()
    // should be 4 of each card face
    const countsOfFace = initialDeck.reduce<Record<CardFace, number>>(
      (acc, current) => {
        acc[current.face] = acc[current.face] ?? 0
        acc[current.face]++
        return acc
      },
      {} as Record<CardFace, number>
    )
    expect(Object.values(countsOfFace).every((value) => value === 4)).toBeTruthy()
  })
})

test('shuffle test', () => {
  vi.spyOn(Math, 'random').mockImplementation(() => 0.2)
  const initialDeck = deck.getInitialDeck()
  const finalDeck = shuffle(initialDeck)
  expect(finalDeck).toEqual(initialDeck.reverse())
  expect(finalDeck === initialDeck).toBeFalsy() // object refs
  vi.clearAllMocks()
})
