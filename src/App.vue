<script setup>
import { ref } from 'vue'
import PasswordInput from './components/PasswordInput.vue'
import Birthday from './components/Birthday.vue'

const isCorrect = ref(false)
</script>

<template>
  <PasswordInput v-if="!isCorrect" @success="isCorrect = true" />
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
