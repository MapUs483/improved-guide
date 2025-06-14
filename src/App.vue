<script setup>
import { ref } from 'vue'
import PasswordInput from './components/PasswordInput.vue'
import Birthday from './components/Birthday.vue'
import Index from './components/index.vue'
import FallingIcons from './components/FallingIcons.vue'

const currentPage = ref('index')
const isCorrect = ref(false)

const handleNext = () => {
  currentPage.value = 'password'
}

const handleSuccess = () => {
  isCorrect.value = true
  currentPage.value = 'birthday'
}
</script>

<template>
  <FallingIcons v-if="isCorrect" />
  <Index v-if="currentPage === 'index'" @next="handleNext" />
  <PasswordInput v-else-if="currentPage === 'password'" @success="handleSuccess" />
  <Birthday v-else />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
