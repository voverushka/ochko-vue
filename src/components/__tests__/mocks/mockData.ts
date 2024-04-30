import type { CardType, CardFace } from '@/shared/types'

const diamondAce = {
  face: 'ace' as CardFace,
  type: 'diamond' as CardType
}
const heartAce = {
  face: 'ace' as CardFace,
  type: 'heart' as CardType
}

const clubAce = {
  face: 'ace' as CardFace,
  type: 'clumb' as CardType
}

const spadesAce = {
  face: 'ace' as CardFace,
  type: 'spades' as CardType
}

const spadesJack = {
  face: 'jack' as CardFace,
  type: 'spades' as CardType
}

const spadesQueen = {
  face: 'queen' as CardFace,
  type: 'spades' as CardType
}

const spadesKing = {
  face: 'king' as CardFace,
  type: 'spades' as CardType
}

const clubsJack = {
  face: 'jack' as CardFace,
  type: 'clumb' as CardType
}

const clubsFive = {
  face: 'five' as CardFace,
  type: 'clumb' as CardType
}

const heartsFive = {
  face: 'five' as CardFace,
  type: 'clumb' as CardType
}

const diamondTwo = {
  face: 'two' as CardFace,
  type: 'diamond' as CardType
}
const heartsTwo = {
  face: 'two' as CardFace,
  type: 'hearts' as CardType
}

const clubs4 = {
  face: 'four' as CardFace,
  type: 'hearts' as CardType
}

const clubs10 = {
  face: 'ten' as CardFace,
  type: 'club' as CardType
}

const clubs3 = {
  face: 'three' as CardFace,
  type: 'club' as CardType
}

const clubs6 = {
  face: 'six' as CardFace,
  type: 'club' as CardType
}

const heart7 = {
  face: 'seven' as CardFace,
  type: 'hearts' as CardType
}

const diamond8 = {
  face: 'eight' as CardFace,
  type: 'hearts' as CardType
}
const diamond9 = {
  face: 'nine' as CardFace,
  type: 'hearts' as CardType
}

export const cards = {
  diamondAce,
  heartAce,
  clubAce,
  spadesAce,
  spadesJack,
  clubsJack,
  clubsFive,
  heartsFive,
  diamondTwo,
  heartsTwo,
  clubs4,
  clubs10,
  spadesQueen,
  spadesKing,
  clubs3,
  clubs6,
  heart7,
  diamond8,
  diamond9
}

export default cards
