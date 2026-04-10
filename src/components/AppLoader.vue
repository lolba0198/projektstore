<template>
    <div>

    </div>
</template>

<script>
export default {
    computed: {
        promotionObject() {
            return this.$store.getters.GET_PROMOTION_OBJECT;
        },

        promotionLoading() {
            return this.$store.getters.GET_PROMOTION_LOADING;
        },

        promotionError() {
            return this.$store.getters.GET_PROMOTION_ERROR;
        }

    }
}
</script>

<style lang="scss" scoped></style>