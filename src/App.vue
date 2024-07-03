<script setup lang="ts">
import TheGame from './components/Game/TheGame.vue'

const addItem = () => {
  fetch('https://dev-54811785.okta.com', {
    method: 'GET'
  })
    .then(() => {
      console.log('Logiged in')
    })
    .catch((e) => {
      console.log('Error ', e)
    })
}
</script>
<template>
  <main>
    <button type="submit" v-on:click="addItem">Test</button>
    <the-game />
  </main>
</template>
