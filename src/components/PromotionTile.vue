<template>
    <div class="promo-tile" :style="contStyle">
        <div class="overlay">
            <h3>{{ promotion.header }}</h3>
            <h2>{{ promotion.description }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "PromotionTile",
    props: {
        promotion: Object
    },
    computed: {
        contStyle() {
            const { image } = this.promotion;

            return {
                backgroundImage: `url(/src/assets/${image})`
            };
        }
    }
};
</script>

<style scoped>
.promo-tile {
    height: 550px;
    width: 100%;
    max-width: 550px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    overflow: hidden;
    align-items: center;
    margin: 15px 0;
}


.overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

h3 {
    color: #fff;
    text-decoration: underline white;
    font-size: 20px;
    margin: 0;
}

h2 {
    color: #fff;
    text-decoration: underline white;
    font-size: 26px;
    margin: 5px 0 0 0;
}
</style>