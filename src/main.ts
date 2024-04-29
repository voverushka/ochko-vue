import './assets/main.css'
import 'the-new-css-reset/css/reset.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import { createApp } from 'vue'
import { Quasar } from 'quasar'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}
})

app.mount('#app')
