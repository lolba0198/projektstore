<template>
    <header>
        <div class="link-container">
            <RouterLink class="hbuttons" to="/" exact>Home</RouterLink>
            <RouterLink class="hbuttons" to="/about">About</RouterLink>
            <RouterLink class="hbuttons" to="/nnn">Not found</RouterLink>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.hbuttons {
    margin-right: 50px;
    font-size: 30px;
    text-decoration: none;
    color: white;
    padding: 15px;
    margin-top: 3px;
    font-family: 'Roboto', sans-serif;
}

.hbuttons:hover {
    background-color: lightskyblue;
    margin-bottom: 3px;
    transition: ease-in 0.08s;
} 


.link-container {
    background-color: rgb(53, 53, 245);
    height: 68px;
    width: 100vw;
    margin-left: -8px;
    display: flex;

}
</style>