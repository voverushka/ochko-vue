<script setup lang="ts">
import type { Card as CardDef } from '../shared/types'
import { cardFaceSettings } from '../shared/presets'

const props = defineProps<CardDef>()
const [value, indicator] = cardFaceSettings[props.face]
</script>
<template>
  <li v-if="!props.closed" class="card">
    <p class="cardValue">
      <span class="valueIndicator">{{ value }}</span>
    </p>
    <span class="indicator">
      <span :style="{ marginRight: '5px' }">
        <!-- TODO: dynamic component or slot-->
        <i class="icon" v-if="props.type === 'spade'">&spades;</i>
        <i class="icon" v-if="props.type === 'heart'" :style="{ color: 'red' }">&hearts;</i>
        <i class="icon" v-if="props.type === 'diamond'" :style="{ color: 'red' }">&diams;</i>
        <i class="icon" v-if="props.type === 'club'">&clubs;</i>
      </span>
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
  top: -10px;
  left: 5px;
  font-size: 23px;
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
.icon {
  font-style: normal;
  font-size: 30px;
}
</style>
