<template>
  <div class="register-wrapper">
    <AppLoader v-if="loading" />
    
    <div class="register-card" v-show="!loading">
      <!-- @submit.prevent blokuje przeładowanie strony po wysłaniu formularza -->
      <form @submit.prevent="onSubmit" class="register-form" novalidate>
        <h2>Logowanie</h2>
        
        <div v-if="error" class="error-banner">{{ error }}</div>

        <div class="input-group">
          <label>Email</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="Wpisz email" 
            required 
          />
        </div>

        <div class="input-group">
          <label>Hasło</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Wpisz hasło" 
            required 
          />
        </div>

        <!-- przycisk aktywny, gdy pola nie są puste -->
        <button type="submit" :disabled="disabled" class="submit-btn">
          Zaloguj się
        </button>

        <p class="switch-auth">
          Nie masz konta? 
          <RouterLink to="/register">Zarejestruj się</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader.vue";

export default {
  components: { AppLoader },
  data() {
    return {
      email: "", 
      password: "",
      error: "",
      internalLoading: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters["user/GET_CURRENT_USER_LOADING"] || this.internalLoading;
    },
    // przycisk zablokowany tylko gdy pola są puste
    disabled() {
      return this.email.length === 0 || this.password.length === 0;
    }
  },
  mounted() {
    this.internalLoading = true;
    setTimeout(() => {
      this.internalLoading = false;
    }, 500);
  },
  methods: {
    onSubmit() {
      this.error = "";
      
      // email walidacja
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.error = "Wprowadzony email ma niepoprawny format!";
        return;
      }

      // haslo walidacja
      if (this.password.length < 3) {
        this.error = "Hasło musi mieć co najmniej 3 znaki.";
        return;
      }

      // jeśli walidacja przeszła -> dispatch akcji do store
      this.$store.dispatch("LOGIN_USER", { 
        email: this.email, 
        password: this.password 
      })
      .then((res) => {
        if (res && res.status === "authorized") {
          this.$router.push("/");
        } else {
          this.error = "Błędny email lub hasło!";
        }
      })
      .catch(() => {
        this.error = "Wystąpił błąd połączenia z serwerem";
      });
    }
  }
}
</script>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 68px);
  background-color: #f4f4f9;
}

.register-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  color: #333;
  font-family: 'Roboto', sans-serif;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
  font-size: 0.9rem;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box; 
  font-size: 1rem;
}

.input-group input:focus {
  outline: none;
  border-color: rgb(53, 53, 245);
}

.submit-btn {
  width: 100%;
  background-color: rgb(53, 53, 245);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2a2af5;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-banner {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  border: 1px solid #ef9a9a;
}

.switch-auth {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #666;
}

.switch-auth a {
  color: rgb(53, 53, 245);
  text-decoration: none;
  font-weight: bold;
}
</style>
