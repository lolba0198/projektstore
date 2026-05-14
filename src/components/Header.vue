<template>
    <header>
        <div class="link-container">
            <div class="nav-links">
                <RouterLink class="hbuttons" to="/" exact>Home</RouterLink>
                <RouterLink class="hbuttons" to="/about">About</RouterLink>
                <RouterLink class="hbuttons" to="/nnn">Not found</RouterLink>
            </div>
            
            <div class="auth-links">
                <span v-if="user" class="user-info">Witaj, {{ user.email }}</span>

                <template v-if="!user">
                    <RouterLink class="hbuttons" to="/login">Login</RouterLink>
                    <RouterLink class="hbuttons" to="/register">Register</RouterLink>
                </template>

                <button v-else @click="logout" class="hbuttons logout-btn">Logout</button>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    computed: {
        user() {
            return this.$store.getters["GET_CURRENT_USER"];
        },
        userLoading() {
            return this.$store.getters["GET_CURRENT_USER_LOADING"];
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("LOGOUT_USER")
                .then(() => {
                    this.$router.push("/login");
                });
        }
    }
}
</script>

<style scoped>
.link-container {
    background-color: rgb(53, 53, 245);
    height: 68px;
    width: 100vw;
    margin-left: -8px;
    display: flex;
    justify-content: space-between; 
    align-items: center;
}

.nav-links, .auth-links {
    display: flex;
    align-items: center;
}

.hbuttons {
    font-size: 30px;
    text-decoration: none;
    color: white;
    padding: 15px;
    font-family: 'Roboto', sans-serif;
    display: inline-block;
    height: 38px;
    line-height: 38px;
}

.nav-links .hbuttons {
    margin-right: 10px;
}

.hbuttons:hover {
    background-color: lightskyblue;
    transition: ease-in 0.08s;
}

.auth-links {
    margin-right: 20px;
}

.user-info {
    color: white;
    font-size: 20px;
    margin-right: 15px;
    font-family: 'Roboto', sans-serif;
}

.logout-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 30px;
    color: white;
}
</style>
