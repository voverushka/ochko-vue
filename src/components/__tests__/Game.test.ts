import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest'
import { mount } from '@vue/test-utils'
import TheGame from '../Game/TheGame.vue'
import TheCard from '../TheCard.vue'
import { cards } from './mocks/mockData'
import { messages } from '@/shared/presets'

describe('TheGame', () => {
  beforeAll(() => {
    vi.mock('../../shared/utils', async (importOriginal) => {
      const mod = await importOriginal<typeof import('../../shared/utils')>()
      return {
        ...mod,
        // replace some exports
        shuffle: vi.fn(() => {
          return [
            cards.clubs3,
            cards.clubs4,
            cards.clubsFive,
            cards.diamond8,
            cards.diamondTwo,
            cards.heart7
          ]
        })
      }
    })
  })
  afterAll(() => {
    vi.clearAllMocks()
  })
  it('initial deal - 2 cards each, one dealers card is closed', async () => {
    const wrapper = mount(TheGame)
    await wrapper.vm.$forceUpdate()
    const areas = wrapper.findAll('.area')
    expect(areas).toHaveLength(2)

    // dealer area
    const dealerArea = areas.at(0)
    const dealerOpenCards = dealerArea?.findAll('.card')
    expect(dealerOpenCards).toHaveLength(1)
    const dealerClosedCards = dealerArea?.findAll('.closedCard')
    expect(dealerClosedCards).toHaveLength(1)

    // player area
    const playerArea = areas.at(1)
    const playerOpenCards = playerArea?.findAll('.card')
    expect(playerOpenCards).toHaveLength(2)
    const playerClosedCards = playerArea?.findAll('.closedCard')
    expect(playerClosedCards).toHaveLength(0)

    // Card components in total
    const cards = wrapper.findAllComponents(TheCard)
    expect(cards).toHaveLength(4)
  })
  it('player hits, no winner, play again ', async () => {
    const wrapper = mount(TheGame)
    await wrapper.vm.$forceUpdate()

    // find hit button
    const playerButtons = wrapper.find('.playerButtonGroup').findAll('q-btn')
    expect(playerButtons).toHaveLength(2)
    const hit = playerButtons.at(0)

    //... and hit
    hit?.trigger('click')
    await wrapper.vm.$forceUpdate()

    // check cards after
    const areas = wrapper.findAll('.area')
    expect(areas).toHaveLength(2)

    // dealer cards - one open other closed
    const dealerArea = areas.at(0)
    const dealerOpenCards = dealerArea?.findAll('.card')
    expect(dealerOpenCards).toHaveLength(1)
    const dealerClosedCards = dealerArea?.findAll('.closedCard')
    expect(dealerClosedCards).toHaveLength(1)

    // player area - 3 cards, all open
    const playerArea = areas.at(1)
    const playerOpenCards = playerArea?.findAll('.card')
    expect(playerOpenCards).toHaveLength(3)
    const playerClosedCards = playerArea?.findAll('.closedCard')
    expect(playerClosedCards).toHaveLength(0)

    // 5 cards in total
    const cards = wrapper.findAllComponents(TheCard)
    expect(cards).toHaveLength(5)

    const dialogHTML = wrapper.find('q-dialog').html()
    expect(dialogHTML).not.toContain(messages['dealer'])
    expect(dialogHTML).not.toContain(messages['player'])
    expect(dialogHTML).not.toContain(messages['draw'])
  })
  it('player stands, no winner, cancel', async () => {
    const wrapper = mount(TheGame)
    await wrapper.vm.$forceUpdate()

    // find stand button and click it
    const playerButtons = wrapper.find('.playerButtonGroup').findAll('q-btn')
    expect(playerButtons).toHaveLength(2)
    const stand = playerButtons.at(1)
    const hit = playerButtons.at(0)

    stand?.trigger('click')
    await wrapper.vm.$forceUpdate()

    // check cards
    const areas = wrapper.findAll('.area')
    expect(areas).toHaveLength(2)
    // dealer hits, and has all cards open
    const dealerArea = areas.at(0)
    const dealerOpenCards = dealerArea?.findAll('.card')
    expect(dealerOpenCards).toHaveLength(3)
    const dealerClosedCards = dealerArea?.findAll('.closedCard')
    expect(dealerClosedCards).toHaveLength(0)

    // player hits, and has 2 cards
    const playerArea = areas.at(1)
    const playerOpenCards = playerArea?.findAll('.card')
    expect(playerOpenCards).toHaveLength(2)
    const playerClosedCards = playerArea?.findAll('.closedCard')
    expect(playerClosedCards).toHaveLength(0)

    // 5 cards in total
    const cards = wrapper.findAllComponents(TheCard)
    expect(cards).toHaveLength(5)

    // dialog is displayed, find cancel and press it
    const dialog = wrapper.find('q-dialog')
    const dialogButtons = dialog.findAll('q-btn')
    expect(dialogButtons).toHaveLength(2)

    expect(dialog.html()).toContain(messages['dealer'])

    const cancel = dialogButtons.at(0)

    cancel?.trigger('click')

    // game is over, buttons disabled
    expect(stand?.attributes('disabled')).toBeTruthy()
    expect(hit?.attributes('disabled')).toBeTruthy()
  })

  it('stand - play again', async () => {
    const wrapper = mount(TheGame)
    await wrapper.vm.$forceUpdate()
    // now about buttons
    const playerButtons = wrapper.find('.playerButtonGroup').findAll('q-btn')
    expect(playerButtons).toHaveLength(2)
    const stand = playerButtons.at(1)

    stand?.trigger('click')
    await wrapper.vm.$forceUpdate()

    const areas = wrapper.findAll('.area')
    expect(areas).toHaveLength(2)
    // dealer cards
    const dealerArea = areas.at(0)
    const dealerOpenCards = dealerArea?.findAll('.card')
    expect(dealerOpenCards).toHaveLength(3)
    const dealerClosedCards = dealerArea?.findAll('.closedCard')
    expect(dealerClosedCards).toHaveLength(0)
    // player cards
    const playerArea = areas.at(1)
    const playerOpenCards = playerArea?.findAll('.card')
    expect(playerOpenCards).toHaveLength(2)
    const playerClosedCards = playerArea?.findAll('.closedCard')
    expect(playerClosedCards).toHaveLength(0)
    //Card components in total
    const cards = wrapper.findAllComponents(TheCard)
    expect(cards).toHaveLength(5)

    const dialogButtons = wrapper.find('q-dialog').findAll('q-btn')
    expect(dialogButtons).toHaveLength(2)

    const play = dialogButtons.at(1)

    play?.trigger('click')

    await wrapper.vm.$forceUpdate()

    // WE START GAME AGAIN
    expect(wrapper.findAllComponents(TheCard)).toHaveLength(4)
  })
})
