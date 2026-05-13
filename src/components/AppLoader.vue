<template>
  <div class="loader-overlay">
    <img :src="loaderSvg" alt="Loading..." class="loader-icon" />
  </div>
</template>

<script>
import loaderSvg from '@/assets/bouncing-circles.svg?url';

export default {
  name: "AppLoader",
  data() {
    return {
      loaderSvg
    };
  }
}
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center; 
  align-items: center;   
  background-color: white; 
  z-index: 99999; 
}

.loader-icon {
  width: 100px;
  height: 100px;
}
</style>
