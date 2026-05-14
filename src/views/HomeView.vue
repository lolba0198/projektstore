<template>
  <div class="promotions-container">
    <RouterLink
      v-for="promotion in promotionsList"
      :to="`/promotion/${promotion.id}`"
      :key="promotion.id"
      class="promo-link"
    >
      <PromotionTile :promotion="promotion" />
    </RouterLink>
  </div>
</template>

<script>
import PromotionTile from "@/components/PromotionTile.vue"

export default {
  components: {
    PromotionTile
  },

  mounted() {
    this.$store.dispatch("FETCH_PROMOTIONS")
  },

  computed: {
    promotionsList() {
      return this.$store.getters.GET_PROMOTIONS_LIST
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
