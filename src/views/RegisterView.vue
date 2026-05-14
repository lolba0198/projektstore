<template>
  <div class="register-wrapper">
    <AppLoader v-if="loading" />

    <div class="register-card" v-show="!loading">
        <!-- exists -->
      <div v-if="exists" class="status-box info">
        <h1>Info</h1>
        <p>Użytkownik o tym adresie już istnieje w naszej bazie.</p>
        <button @click="exists = false" class="action-btn">Powrót</button>
      </div>

      <!-- sukces -->
      <div v-else-if="registered" class="status-box success">
        <h1>Sukces!</h1>
        <p>Twoje konto zostało założone poprawnie.</p>
        <RouterLink to="/" class="action-btn">Strona główna</RouterLink>
      </div>

      <!-- formularz -->
      <form v-else @submit.prevent="onSubmit" class="register-form">
        <h2>Utwórz konto</h2>

        <div v-if="error" class="error-banner">{{ error }}</div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="przyklad@poczta.pl" required />
        </div>

        <div class="input-group">
          <label>Hasło</label>
          <input v-model="password" type="password" placeholder="Min. 3 znaki" required />
        </div>

        <div class="input-group">
          <label>Powtórz hasło</label>
          <input v-model="confirmPassword" type="password" placeholder="Wpisz hasło ponownie" required />
        </div>

        <button type="submit" :disabled="disabled" class="submit-btn">
          Zarejestruj się
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from "@/api";
import AppLoader from "@/components/AppLoader.vue";

export default {
  name: "RegisterView",
  components: { AppLoader },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      exists: false,
      registered: false,
      loading: false
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 800);
  },
  computed: {
    // przycisk zablokowany, jeśli pola są puste lub email za krótki
    disabled() {
      return this.email.length === 0 || this.password.length === 0 || this.confirmPassword.length === 0;
    }
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

      // takie samo haslo
      if (this.password !== this.confirmPassword) {
        this.error = "Hasła nie są identyczne!";
        return;
      }

      this.error = "";
      this.loading = true;

      // wysylanie
      registerUser({ email: this.email, password: this.password })
        .then((data) => {
          if (data.status === "exists") {
            this.exists = true;
          } else if (data.status === "registered") {
            this.registered = true;
          }
        })
        .catch(() => {
          this.error = "Błąd serwera. Spróbuj ponownie później.";
        })
        .finally(() => {
          this.loading = false;
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
  background-color: #f4f7f6;
  font-family: 'Roboto', sans-serif;
}

.register-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 5px;
  color: #333;
  text-align: center;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 25px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.85rem;
  color: #555;
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
  margin-top: 10px;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1e1edb;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-banner {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  border: 1px solid #ef9a9a;
  text-align: center;
}

.status-box {
  text-align: center;
}

.status-box h1 { margin-bottom: 10px; }
.status-box p { margin-bottom: 20px; color: #555; }

.action-btn {
  display: inline-block;
  background-color: lightskyblue;
  color: #333;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}
</style>
