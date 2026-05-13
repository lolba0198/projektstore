<template>
  <div v-if="promotionObject.id">
    <div class="promo-banner" :style="imageStyle">
      <div class="banner-overlay">
        <h1>{{ promotionObject.header }}</h1>
        <p>{{ promotionObject.description }}</p>
      </div>
    </div>

    <div class="promo-content">
      <p class="promo-text">{{ promotionObject.longDescription }}</p>
      <div class="promo-footer">
        <strong>Promotion ends: {{ promotionObject.endDate || 'while stocks last' }}</strong>
      </div>
    </div>

    <div class="products-grid">
      <ProductTile 
        v-for="product in promotionObject.items" 
        :key="product.id" 
        :product="product" 
        class="product-card"
      />
    </div>
  </div>
</template>

<script>
import ProductTile from '@/components/ProductTile.vue';

export default {
  created() {
    this.$store.dispatch('FETCH_PROMOTION', this.$route.params.id);
  },
  computed: {
    promotionObject() {
      return this.$store.getters.GET_PROMOTION_OBJECT;
    },
    imageStyle() {
      return { backgroundImage: `url(/src/assets/${this.promotionObject.image})` };
    },
  },
  components: { ProductTile },
};
</script>

<style scoped>
.promo-banner {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.banner-overlay {
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 8px;
}

.promo-content {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.promo-footer {
  background: #eee;
  padding: 15px;
  margin-top: 20px;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  transition: box-shadow 0.3s;
}
</style>
