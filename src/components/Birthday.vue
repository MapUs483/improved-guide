<template>
  <div class="container" style="position: relative;">
    <audio ref="audioPlayer" @ended="onSongEnded">
      <source src="/audio/happy-birthday-357371.mp3" type="audio/mpeg">
    </audio>
    <button v-if="showSoundControl" class="sound-btn" @click="toggleSound" :class="{ 'sound-off': !isPlaying }">
      {{ isPlaying ? '🔊' : '🔇' }}
    </button>
    <h2 class="typing-title"><span>🎂</span> Happy Birthday <span>🎉</span></h2>
    <p class="msg typing-text"></p>
    <button class="gift-btn" @click="openGift" v-if="!showGift">Mở quà bất ngờ</button>
    <transition name="pop">
      <div v-if="showGift" class="gift">🎁<div class="confetti"></div></div>
    </transition>
    <div v-if="showGift" class="heart-container">
      <div
        v-for="(img, idx) in images"
        :key="img"
        class="heart-img"
        :style="showHeart ? getHeartStyle(idx) : getStackStyle(idx)"
      >
        <img :src="img" />
      </div>
      <div class="cake-center">
        🎂
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showGift = ref(false)
const showHeart = ref(false)
const message = "Chúc mừng sinh nhật người con gái đáng iu nhất trên đời! Anh mong em luôn mạnh khỏe, luôn rạng rỡ và hạnh phúc. Anh sẽ luôn cố gắng để mang đến cho em những điều bất ngờ nhất!"
const title = "🎂 Happy Birthday 🎉"

const audioPlayer = ref(null)
const isPlaying = ref(false)
const showSoundControl = ref(false)

// Danh sách ảnh mẫu (bạn thay link ảnh thật vào đây)
const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
]

function getStackStyle(idx) {
  const size = Math.min(window.innerWidth * 1.1, 480)
  return {
    left: `${size/2}px`,
    top: `${size/2}px`,
    transform: 'scale(1)',
    zIndex: images.length - idx,
    transition: 'all 0.5s cubic-bezier(.68,-0.55,.27,1.55)'
  }
}

function getHeartStyle(idx) {
  const total = images.length
  const t = (idx / total) * 2 * Math.PI
  const size = Math.min(window.innerWidth * 1.1, 480)
  const a = size / 32
  const x = a * 16 * Math.pow(Math.sin(t), 3) + a * 1.5 - 40
  const y = -a * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) - 18
  return {
    left: `${x + size/2}px`,
    top: `${y + size/2}px`,
    transform: 'scale(1.1)',
    zIndex: idx + 1,
    transition: `all 0.7s ${idx * 0.08}s cubic-bezier(.68,-0.55,.27,1.55)`
  }
}

function openGift() {
  showGift.value = true
  setTimeout(() => {
    showHeart.value = true
  }, 600) // Đợi hiệu ứng mở quà xong mới hiện ảnh
}

function onSongEnded() {
  showSoundControl.value = true
  isPlaying.value = false
}

function toggleSound() {
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.currentTime = 0 // Reset về đầu bài hát
    audioPlayer.value.play().catch(error => {
      console.log('Không thể phát nhạc:', error)
    })
  }
  isPlaying.value = !isPlaying.value
}

onMounted(() => {
  // Phát nhạc một lần khi component được mount
  audioPlayer.value.play()
    .then(() => {
      isPlaying.value = true
    })
    .catch(error => {
      console.log('Không thể phát nhạc tự động:', error)
      showSoundControl.value = true // Hiện nút điều khiển nếu không phát được
    })
  
  // Animation cho tiêu đề
  const titleElement = document.querySelector('.typing-title')
  let titleIndex = 0
  function typeTitle() {
    if (titleIndex < title.length) {
      titleElement.textContent = title.substring(0, titleIndex + 1)
      titleIndex++
      setTimeout(typeTitle, 100)
    } else {
      // Sau khi tiêu đề xuất hiện xong, bắt đầu hiện thông điệp
      typeMessage()
    }
  }
  // Animation cho thông điệp
  const textElement = document.querySelector('.typing-text')
  let messageIndex = 0
  function typeMessage() {
    if (messageIndex < message.length) {
      textElement.textContent += message.charAt(messageIndex)
      messageIndex++
      setTimeout(typeMessage, 50)
    }
  }
  typeTitle()
})
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 414px;
  margin: 20px auto;
  padding: 20px 15px;
  background: rgba(255, 192, 203, 0.35);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  text-align: center;
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 192, 203, 0.25);
  box-sizing: border-box;
}

.typing-title {
  font-size: 2em;
  margin: 0 0 20px 0;
  padding: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  min-height: 1.5em;
  display: inline-block;
  color: #e91e63;
  font-weight: 600;
  letter-spacing: 2px;
  position: relative;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.typing-title span {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

.typing-title span:nth-child(2) {
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.msg {
  min-height: 120px;
  color: #a8326e;
  font-size: 1.1em;
  margin: 0 0 20px 0;
  padding: 0 10px;
  line-height: 1.5;
}

.gift-btn {
  padding: 12px 24px;
  font-size: 1.1em;
  margin: 10px 0;
}

/* Thêm media queries cho các màn hình nhỏ */
@media screen and (max-width: 414px) {
  .container {
    margin: 10px auto;
    padding: 15px 10px;
  }
  
  .typing-title {
    font-size: 1.5em;
  }
  
  .msg {
    font-size: 1em;
    min-height: 100px;
  }
  
  .gift-btn {
    padding: 10px 20px;
    font-size: 1em;
  }
}

/* Thêm media queries cho các màn hình rất nhỏ */
@media screen and (max-width: 320px) {
  .typing-title {
    font-size: 1.3em;
  }
  
  .msg {
    font-size: 0.9em;
  }
}

h1 {
  color: #d63384;
  margin-bottom: 18px;
  font-weight: 800;
  letter-spacing: 1px;
  font-size: 2.2em;
}
.gift-btn {
  padding: 14px 36px;
  border-radius: 22px;
  background: linear-gradient(90deg, #ffb6c1 0%, #ff69b4 100%);
  color: white;
  font-size: 1.2em;
  font-weight: 700;
  border: none;
  box-shadow: 0 2px 8px 0 rgba(214,51,132,0.10);
  cursor: pointer;
  margin-bottom: 18px;
  transition: background 0.2s, transform 0.1s;
}
.gift-btn:hover {
  background: linear-gradient(90deg, #ff69b4 0%, #ffb6c1 100%);
  transform: scale(1.05);
}
.gift {
  margin-top: 24px;
  font-size: 2.2em;
  color: #ff4d6d;
  animation: pop 0.5s;
  position: relative;
}
@keyframes pop {
  0% { transform: scale(0.5); opacity: 0; }
  80% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); }
}
.pop-enter-active, .pop-leave-active {
  transition: all 0.5s;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.typing-text {
  min-height: 80px;
  color: #a8326e;
  font-size: 1.15em;
  margin-bottom: 28px;
  font-weight: 500;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #d63384 }
}

.heart-container {
  position: absolute;
  left: 47%;
  top: 48%;
  transform: translate(-50%, -50%);
  width: 110vw;
  max-width: 480px;
  height: 110vw;
  max-height: 480px;
  pointer-events: none;
  z-index: 1000;
}
.heart-img {
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  pointer-events: auto;
  background: #fff;
  border: 2px solid #ffb6c1;
}
.heart-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 414px) {
  .heart-container {
    max-width: 370px;
    max-height: 370px;
  }
  .heart-img {
    width: 38px;
    height: 38px;
    border-radius: 10px;
  }
}
.cake-center {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  font-size: 7em;
  z-index: 1100;
  pointer-events: none;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.12));
  animation: shake-cake 1.5s infinite linear;
}
.cake-center img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
@keyframes shake-cake {
  0%, 100% { transform: translate(-50%, -50%) rotate(-2deg) scale(1.08); }
  20% { transform: translate(-50%, -50%) rotate(2deg) scale(1.12); }
  40% { transform: translate(-50%, -50%) rotate(-2deg) scale(1.1); }
  60% { transform: translate(-50%, -50%) rotate(2deg) scale(1.13); }
  80% { transform: translate(-50%, -50%) rotate(-2deg) scale(1.09); }
}

.sound-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 192, 203, 0.8);
  border: 2px solid #ff69b4;
  color: #d63384;
  font-size: 1.2em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(214, 51, 132, 0.2);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.sound-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 192, 203, 0.95);
}

.sound-btn.sound-off {
  background: rgba(255, 255, 255, 0.8);
  color: #999;
  border-color: #ccc;
}

@media (max-width: 414px) {
  .sound-btn {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    font-size: 1.1em;
  }
}
</style> 