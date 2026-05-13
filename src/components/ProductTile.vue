<template>
  <RouterLink :to="`/product/${product.id}`" class="tile-link">
    <img :src="`/src/assets/${product.image}`" :alt="product.name" class="product-img" />
    <h3 class="product-name">{{ product.name }}</h3>
    
    <AppRating 
      v-if="product.ratingOption"
      :rate="product.rate" 
      :ratesNumber="product.ratesNumber" 
    />
    
    <div class="product-price">{{ product.price }} zł</div>
  </RouterLink>
</template>

<script>
import AppRating from '@/components/AppRating.vue';

export default {
  components: { AppRating },
  props: {
    product: Object
  }
}
</script>

<style scoped>
.tile-link { text-decoration: none; color: #333; display: block; }
.product-img { width: 100%; height: 200px; object-fit: cover; }
.product-name { margin: 10px 0; font-size: 1.2rem; }
.product-rating { color: #f39c12; }
</style>
