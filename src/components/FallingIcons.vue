<template>
  <div class="falling-icons-container">
    <div v-for="(icon, index) in icons" 
         :key="index" 
         class="falling-icon"
         :style="getRandomStyle(index)">
      {{ icon }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FallingIcons',
  data() {
    return {
      icons: ['🎂', '🎁', '🎈', '🎉', '🎊', '🎀', '🎆', '🎇'],
      totalIcons: 20
    }
  },
  methods: {
    getRandomStyle(index) {
      const randomX = Math.random() * 100 // Random position from 0-100%
      const randomDelay = Math.random() * 5 // Random delay 0-5s
      const randomDuration = 3 + Math.random() * 2 // Random duration 3-5s
      const randomSize = 20 + Math.random() * 20 // Random size 20-40px
      
      return {
        left: `${randomX}%`,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
        fontSize: `${randomSize}px`
      }
    }
  },
  mounted() {
    // Tạo thêm icons để có nhiều icon rơi hơn
    const additionalIcons = []
    for (let i = 0; i < this.totalIcons; i++) {
      const randomIcon = this.icons[Math.floor(Math.random() * this.icons.length)]
      additionalIcons.push(randomIcon)
    }
    this.icons = additionalIcons
  }
}
</script>

<style scoped>
.falling-icons-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
}

.falling-icon {
  position: absolute;
  top: -50px;
  animation: falling linear infinite;
  opacity: 0.8;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

@keyframes falling {
  0% {
    transform: translateY(-50px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(calc(100vh + 50px)) rotate(360deg);
    opacity: 0;
  }
}
</style> 