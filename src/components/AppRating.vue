<template>
  <div class="rating-container">
    <span 
      v-for="star in 5" 
      :key="star" 
      class="star"
      :class="{ 'filled': star <= Math.round(rate) }"
    >
      ★
    </span>
    <span class="count" v-if="ratesNumber">({{ ratesNumber }})</span>
  </div>
</template>

<script>
export default {
  name: "AppRating",
  props: {
    rate: { type: Number, default: 0 },
    ratesNumber: { type: Number, default: 0 },
    ratingOption: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.rating-container { display: flex; align-items: center; }
.star { color: #ccc; font-size: 1.1rem; }
.star.filled { color: #f39c12; }
.count { margin-left: 6px; color: #666; font-size: 0.85rem; }
</style>
