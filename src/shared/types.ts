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

export type Card = {
  face: CardFace
  type: CardType
  closed?: boolean
}

export type GameState = {
  deck: Deck
  playerCards: Deck
  dealerCards: Deck
  winner: GameResult | undefined
}

export type Command = 'hit' | 'stand' | 'deal'

export type Action = {
  type: Command
}

export type GameResult = 'dealer' | 'player' | 'draw' | 'bust'

export type Deck = Array<Card>

export type Reducer<S, A> = (prevState: S, action: A) => S

export type JudgeFunction = (playerCards: Deck, dealerCards: Deck) => GameResult | undefined
