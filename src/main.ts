import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

axios.defaults.baseURL = 'https://8080-mineda-springtopicos202-v6q06tntvms.ws-us116.gitpod.io/';

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
