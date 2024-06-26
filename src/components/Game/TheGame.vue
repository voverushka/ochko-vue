<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { messages } from '@/shared/presets'
import { useHandState } from './gameState'
import { cardFaceSettings } from '@/shared/presets'
import TheCard from '../TheCard.vue'
import TheDialog from '../TheDialog.vue'

const { handState, issueCommand } = useHandState()

const gameOver = ref(true)

onMounted(() => {
  issueCommand('deal')
  gameOver.value = false
})
const handOver = computed(() => handState.value.winner !== undefined)

const dealerCounts = computed(() => {
  const { dealerCounts, dealerCards } = handState.value
  if (dealerCounts === undefined && dealerCards[0] !== undefined) {
    const face = dealerCards[0].face
    const [points] = cardFaceSettings[face]
    return `${points} + X`
  }
  return handState.value.dealerCounts
})
</script>
<template>
  <div class="container">
    <section class="area shadow-11">
      <div class="header">
        Dealer
        <span class="points"
          >(
          {{ dealerCounts }}
          points )</span
        >
      </div>
      <ul class="cardsList">
        <the-card
          v-for="(card, index) in handState.dealerCards"
          :type="card.type"
          :face="card.face"
          :closed="card.closed"
          :key="`${index}-${card.type}-${card.face}`"
        />
      </ul>
    </section>
    <div class="spacer" />
    <section class="area">
      <div class="header">
        Player <span class="points">( {{ handState.playerCounts }} points )</span>
      </div>
      <ul class="cardsList">
        <the-card
          v-for="(card, index) in handState.playerCards"
          :type="card.type"
          :face="card.face"
          :closed="card.closed"
          :key="`${index}-${card.type}-${card.face}`"
        />
      </ul>
      <div class="playerButtonGroup">
        <q-btn
          round
          color="positive"
          icon="front_hand"
          :disabled="handOver === true"
          @click="issueCommand('hit')"
          >Hit</q-btn
        >
        <q-btn
          round
          color="negative"
          icon="do_not_touch"
          :disabled="handOver === true"
          @click="issueCommand('stand')"
          >Stand</q-btn
        >
      </div>
    </section>
  </div>
  <the-dialog
    :open="handOver === true && gameOver === false"
    :onCancel="() => (gameOver = true)"
    :onContinue="() => issueCommand('deal')"
    :message="handState.winner ? messages[handState.winner] : ''"
  />
</template>

<style scoped>
.area {
  width: 100%;
  height: 50%;
  min-height: 400px;
  min-width: 800px;
  overflow: auto;
  background: #dcdcd8;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  justify-content: space-around;
}

.playerButtonGroup {
  padding: 20px;
  & button {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    width: 100px;
    &:not(disabled):hover {
      cursor: pointer;
    }
    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
.container {
  padding: 20px;
  width: 100%;
  height: 100%;
  min-height: 800px;
  min-width: 800px;
  overflow: auto;
}
.cardsList {
  list-style: none;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.header {
  font-size: 25px;
  padding: 20px 20px 0px;
  font-weight: 500;
  text-transform: uppercase;
}
.spacer {
  width: 100%;
  height: 10px;
}
.points {
  text-transform: none;
  color: gray;
}
</style>
./gameState
