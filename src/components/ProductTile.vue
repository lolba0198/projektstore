<template>
  <RouterLink :to="`/product/${product.id}`">
    <img :src="`/src/assets/${product.image}`" :alt="product.name" />
    <div>{{ product.name }}</div>
    <div>{{ product.price }}</div> 
  </RouterLink>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>