<template>
  <div class="carousel-container">
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div v-for="(image, index) in images" 
             :key="index" 
             :class="['carousel-item', { active: index === 0 }]">
          <img :src="image" class="d-block w-100 carousel-img" :alt="`Slide ${index + 1}`" @error="(e) => e.target.src = '/image/Untitled.png'">
          <div v-if="index === images.length - 1" class="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
            <button class="start-btn" @click="emit('next')">
              Bắt đầu ngay
            </button>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const emit = defineEmits(['next'])

// Tạo một mảng refs để lưu trữ các hình ảnh
const images = ref([
  new URL('/image/Untitled.png', import.meta.url).href,
  new URL('/image/Untitled2.png', import.meta.url).href,
  new URL('/image/Untitled3.png', import.meta.url).href,
  new URL('/image/Untitled4.png', import.meta.url).href,
  new URL('/image/Untitled5.png', import.meta.url).href,
  new URL('/image/Untitled6.png', import.meta.url).href,
  new URL('/image/Untitled7.png', import.meta.url).href,
  new URL('/image/Untitled8.png', import.meta.url).href,
  new URL('/image/Untitled9.png', import.meta.url).href,
  new URL('/image/Untitled10.png', import.meta.url).href,
  new URL('/image/Untitled11.png', import.meta.url).href,
  new URL('/image/Untitled12.png', import.meta.url).href,
  new URL('/image/Untitled13.png', import.meta.url).href,
  new URL('/image/Untitled14.png', import.meta.url).href,
  new URL('/image/Untitled15.png', import.meta.url).href,
  new URL('/image/Untitled16.png', import.meta.url).href,
  new URL('/image/Untitled17.png', import.meta.url).href,
  new URL('/image/Untitled18.png', import.meta.url).href,
  new URL('/image/Untitled19.png', import.meta.url).href
])

// Thêm một hàm để kiểm tra xem hình ảnh có tồn tại không
const checkImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

// Kiểm tra tất cả hình ảnh khi component được tạo
onMounted(async () => {
  for (let i = 0; i < images.value.length; i++) {
    const exists = await checkImage(images.value[i])
    if (!exists) {
      console.error(`Không thể tải hình ảnh: ${images.value[i]}`)
    }
  }
})
</script>

<style scoped>
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.carousel {
  width: 100%;
  max-width: 600px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.carousel-item {
  position: relative;
  transform: none !important;
  transition: none !important;
}

.carousel-item.active {
  transform: none !important;
}

.carousel-inner {
  transform: none !important;
}

.carousel-item img {
  height: 400px;
  object-fit: cover;
  transform: none !important;
  transition: none !important;
}

.carousel-caption {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.start-btn {
  padding: 50px 100px;
  font-size: 1.2em;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.start-btn:hover {
  transform: translateY(-2px);
  background: #45a049;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

.start-btn:active {
  transform: translateY(1px);
}

.carousel-control-prev,
.carousel-control-next {
  width: 10%;
  opacity: 0.7;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
}
</style>