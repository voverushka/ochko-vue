import { test, expect } from '@playwright/test'

test('game e2e tests', async ({ page }) => {
  const dealerHeadersLocator = page.locator('.header', { hasText: 'Dealer' })
  const playerHeadersLocator = page.locator('.header', { hasText: 'Player' })
  const playerArea = page.locator('.area', { hasText: 'Player' })
  const dealerArea = page.locator('.area', { hasText: 'Dealer' })
  const openCards = page.locator('.card')
  const closedCardsLocator = page.locator('.closedCard')
  const cardsListLocator = page.locator('.cardsList')
  const hitButtonLocator = page.locator('button', { hasText: 'Hit' })
  const standButtonLocator = page.locator('button', { hasText: 'stand' })
  const playAgainButtonLocator = page.locator('button', { hasText: 'play again' })
  const cancelButtonLocator = page.locator('button', { hasText: 'cancel' })
  const dialogLocator = page.locator('q-dialog')

  // initial DEAL
  await page.goto('http://localhost:5173')

  await expect(dealerHeadersLocator).toBeVisible()
  await expect(playerHeadersLocator).toBeVisible()
  await expect(playerArea).toBeVisible()
  await expect(dealerArea).toBeVisible()

  await expect(dealerArea).toBeVisible()
  await expect(playerArea).toBeVisible()

  const hitButton = await hitButtonLocator
  const standButton = await standButtonLocator

  await expect(hitButton).toBeVisible()
  await expect(standButton).toBeVisible()

  await expect(dealerArea.locator('.closedCard')).toHaveCount(1)
  await expect(dealerArea.locator('.card')).toHaveCount(1)

  let openPlayerCards = await playerArea.locator('.card')
  expect(openPlayerCards).toHaveCount(2)

  const closedPlayerCards = await playerArea.locator('.closedCard')
  expect(closedPlayerCards).toHaveCount(0)

  await expect(playerArea.locator('.card').nth(0)).toBeVisible()
  await expect(playerArea.locator('.card').nth(1)).toBeVisible()

  await hitButton.click()
  await expect(playerArea.locator('.card')).toHaveCount(3)
})
