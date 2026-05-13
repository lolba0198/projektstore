<template>
  <div>
    <Header></Header>
    <AppLoader v-if="promotionLoading" /> <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue';
import AppLoader from './components/AppLoader.vue';

const store = useStore();
const promotionLoading = computed(() => store.getters.GET_PROMOTION_LOADING);
</script>
