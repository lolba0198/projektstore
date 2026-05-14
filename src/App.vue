<template>
  <div>
    <AppLoader v-if="isLoading" />
    <Header></Header>
    <RouterView />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue';
import AppLoader from './components/AppLoader.vue';

const store = useStore();

const isLoading = computed(() => {
  return (
    store.getters['GET_PROMOTIONS_LOADING'] || 
    store.getters['GET_PROMOTION_LOADING'] ||
    store.getters['GET_CURRENT_USER_LOADING'] 
  );
});
onMounted(() => {
  store.dispatch("FETCH_CURRENT_USER");
});
</script>
