import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest'
import { mount } from '@vue/test-utils'
import TheGame from '../Game/TheGame.vue'
import TheCard from '../TheCard.vue'
import { cards } from './mocks/mockData'

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
    vi.resetAllMocks()
  })
  it('initial deal ', async () => {
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
  it('hit - play again ', async () => {
    const wrapper = mount(TheGame)
    await wrapper.vm.$forceUpdate()
    // now about buttons
    const playerButtons = wrapper.find('.playerButtonGroup').findAll('q-btn')
    expect(playerButtons).toHaveLength(2)
    const hit = playerButtons.at(0)

    hit?.trigger('click')
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
    expect(playerOpenCards).toHaveLength(3)
    const playerClosedCards = playerArea?.findAll('.closedCard')
    expect(playerClosedCards).toHaveLength(0)
    // // Card components in total
    const cards = wrapper.findAllComponents(TheCard)
    expect(cards).toHaveLength(5)
  })
  it('stand - cancel', async () => {
    const wrapper = mount(TheGame)
    await wrapper.vm.$forceUpdate()
    // now about buttons
    const playerButtons = wrapper.find('.playerButtonGroup').findAll('q-btn')
    expect(playerButtons).toHaveLength(2)
    const stand = playerButtons.at(1)
    const hit = playerButtons.at(0)

    stand?.trigger('click')
    await wrapper.vm.$forceUpdate()

    const areas = wrapper.findAll('.area')
    expect(areas).toHaveLength(2)
    // dealer area
    const dealerArea = areas.at(0)
    const dealerOpenCards = dealerArea?.findAll('.card')
    expect(dealerOpenCards).toHaveLength(3)
    const dealerClosedCards = dealerArea?.findAll('.closedCard')
    expect(dealerClosedCards).toHaveLength(0)
    // player area
    const playerArea = areas.at(1)
    const playerOpenCards = playerArea?.findAll('.card')
    expect(playerOpenCards).toHaveLength(2)
    const playerClosedCards = playerArea?.findAll('.closedCard')
    expect(playerClosedCards).toHaveLength(0)
    // // Card components in total
    const cards = wrapper.findAllComponents(TheCard)
    expect(cards).toHaveLength(5)

    const dialogButtons = wrapper.find('q-dialog').findAll('q-btn')
    expect(dialogButtons).toHaveLength(2)

    const cancel = dialogButtons.at(0)

    cancel?.trigger('click')

    await wrapper.vm.$forceUpdate()

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
    const hit = playerButtons.at(0)

    stand?.trigger('click')
    await wrapper.vm.$forceUpdate()

    const areas = wrapper.findAll('.area')
    expect(areas).toHaveLength(2)
    // dealer area
    const dealerArea = areas.at(0)
    const dealerOpenCards = dealerArea?.findAll('.card')
    expect(dealerOpenCards).toHaveLength(3)
    const dealerClosedCards = dealerArea?.findAll('.closedCard')
    expect(dealerClosedCards).toHaveLength(0)
    // player area
    const playerArea = areas.at(1)
    const playerOpenCards = playerArea?.findAll('.card')
    expect(playerOpenCards).toHaveLength(2)
    const playerClosedCards = playerArea?.findAll('.closedCard')
    expect(playerClosedCards).toHaveLength(0)
    // // Card components in total
    const cards = wrapper.findAllComponents(TheCard)
    expect(cards).toHaveLength(5)

    const dialogButtons = wrapper.find('q-dialog').findAll('q-btn')
    expect(dialogButtons).toHaveLength(2)

    const play = dialogButtons.at(1)

    play?.trigger('click')

    await wrapper.vm.$forceUpdate()

    // we are athe the start, deal done again
    expect(wrapper.findAllComponents(TheCard)).toHaveLength(4)
  })
})
