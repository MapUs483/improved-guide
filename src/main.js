import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Particles from '@tsparticles/vue3'

const app = createApp(App)
app.use(Particles)
app.mount('#app')
