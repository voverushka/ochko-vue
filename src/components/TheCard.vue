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
  <li v-if="!props.closed" class="card">
    <p class="cardValue">
      <span class="valueIndicator">{{ value }}</span>
    </p>
    <span class="indicator">
      <component :is="CardTypeIndicator[props.type]" />
      <span>{{ indicator }}</span>
    </span>
  </li>
  <li v-else class="closedCard" />
</template>

<style scoped>
.card {
  margin-top: 5px;
  margin-left: 5px;
  display: inline-block;
  width: 150px;
  height: 200px;
  min-width: 150px;
  min-height: 200px;
  background: #ffffff;
  border: 3px solid #433939;
  position: relative;
  border-radius: 5px;
  box-shadow: 4px 8px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 4px 8px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 8px 14px 0px rgba(0, 0, 0, 0.75);
}
.indicator {
  position: absolute;
  top: -5px;
  left: 5px;
  font-size: 23px;
  i {
    font-size: 30px;
    margin-right: 5px;
  }
}
.cardValue {
  font-size: 40px;
  margin: 66px auto;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  border: 3px solid #c7c064;
  position: relative;
  border-radius: 5px;
  background-image: linear-gradient(
    #553c9a 0%,
    #553c9a 20%,
    #b393d3 40%,
    #553c9a 60%,
    #b393d3 80%,
    #553c9a 100%
  );
  background-size: cover;
  box-shadow: 4px 8px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 4px 8px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 8px 14px 0px rgba(0, 0, 0, 0.75);
}
</style>
