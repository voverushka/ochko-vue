# ochko-vue

The project is setup using Vue 3 / Vite /Typescript template

## implementation notes

### Rules

1. When clarifying rules, I found that **Dealer also gets 2 cards at the start**, one of them is face down, which makes sense for me, as Player cannot guess what score Dealer has.
2. After deal, there is small possibility that **Player gets 2 aces, and busts immediatelly** I did not know how exactly how to handle that case. I make Dealer to check his card in that case, if he also has 2 aces, game result is BUST. Not sure if that is correct.
3. If you select Cancel in Result dialog, you need to refresh page in case you want to play again.

### Other Details

1. As I am more fluent in React at the moment, _[I implemented game also in React](git@github.com:voverushka/ochko.git)_
   Vue implementation is more 'translation' of React one (which might not be best practise). _I did not use router, Pinia, as app is too simple for this._
2. I did not do checks for accessibility, responsiveness - that would take additional time
3. **I did not write Playwright tests**, as considering randomness of Deck, I thought it was better to create mocks and to check flow in Vitest. They are not full set though.
4. Initially I wanted to use _vue-styled-components_, (similar to styled-components in React implementation) but as it has 5 high security vulnerabilities, so I dropped idea and left 'raw styled'

**In any case, I'd like to get concrete feedback to know what I could improve next time !**

# Project Setup

I had node v20.12.2 when developing app, but based on docs, version 18.3 might be sufficient. If no, please install v20.12.2.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
