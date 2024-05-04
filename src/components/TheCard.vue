<script setup lang="ts">
import { h } from 'vue'
import type { Card as CardDef, CardType } from '../shared/types'
import { cardFaceSettings } from '../shared/presets'

const iconStyles = {
  marginRight: '5px',
  fontSize: '30px'
}
const CardTypeIndicator: Record<CardType, any> = {
  spade: h('i', { style: iconStyles, innerHTML: '&spades;' }),
  heart: h('i', { style: { ...iconStyles, color: 'red' }, innerHTML: '&hearts;' }),
  diamond: h('i', { style: { ...iconStyles, color: 'red' }, innerHTML: '&diams;' }),
  club: h('i', { style: iconStyles, innerHTML: '&clubs;' })
}
const props = defineProps<CardDef>()
const [value, indicator] = cardFaceSettings[props.face]
</script>
<template>
  <li v-if="!props.closed" class="card shadow-16">
    <p class="cardValue">
      <span class="valueIndicator">{{ value }}</span>
    </p>
    <span class="indicator">
      <component :is="CardTypeIndicator[props.type]" />
      <span>{{ indicator }}</span>
    </span>
  </li>
  <li v-else class="closedCard shadow-16" />
</template>

<style scoped>
.card {
  margin-top: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 200px;
  min-width: 150px;
  min-height: 200px;
  background: #ffffff;
  border: 3px solid #000000;
  position: relative;
  border-radius: 5px;
}
.indicator {
  position: absolute;
  top: 0px;
  left: 5px;
  line-height: 1;
  font-size: 23px;
  i {
    font-size: 30px;
    margin-right: 5px;
  }
}
.cardValue {
  font-size: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
}
.valueIndicator {
  text-align: center;
  &::after {
    position: relative;
    content: 'points';
    font-size: 12px;
    display: block;
    top: -5px;
  }
}
.closedCard {
  margin-top: 5px;
  margin-left: 5px;
  display: inline-block;
  width: 150px;
  height: 200px;
  border: 3px solid #000000;
  position: relative;
  border-radius: 5px;
  background-image: linear-gradient(
    #9b99a0 0%,
    #535055 20%,
    #9b99a0 40%,
    #535055 60%,
    #9b99a0 80%,
    #535055 100%
  );
}
</style>
