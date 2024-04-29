import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheCard from '../TheCard.vue'

describe('SingleCard', () => {
  it('renders properly when opened', () => {
    const wrapper = mount(TheCard, { props: { type: 'club', face: 'queen' } })
    expect(wrapper.text()).toContain('Q')
    expect(wrapper.text()).toContain('10')
    expect(wrapper.classes()).toContain('card')
  })
  it('renders properly when closed', () => {
    const wrapper = mount(TheCard, { props: { type: 'club', face: 'queen', closed: true } })
    expect(wrapper.text()).not.toContain('Q')
    expect(wrapper.text()).not.toContain('10')
    expect(wrapper.classes()).toContain('closedCard')
  })
})
