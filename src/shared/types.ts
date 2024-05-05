// NOTE: I selected 'set of strings' vs enums in these types
// for simplicity reasons

export type CardFace =
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'ace'
  | 'jack'
  | 'queen'
  | 'king'

export type CardType = 'spade' | 'heart' | 'diamond' | 'club'
export type Command = 'hit' | 'stand' | 'deal'
export type Winner = 'dealer' | 'player' | 'draw'

export type Deck = Array<Card>

export type JudgeFunction = (playerCards: Deck, dealerCards: Deck) => GameResult

export type Card = {
  face: CardFace
  type: CardType
  closed?: boolean
}

export type GameState = {
  deck: Deck
  playerCards: Deck
  dealerCards: Deck
  winner: Winner | undefined
} & GameResult

export type GameResult = {
  playerCounts: number
  dealerCounts: number | undefined
  winner: Winner | undefined
}
