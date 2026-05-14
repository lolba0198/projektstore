import { loginUser, logoutUser, getCurrentUser, registerUser } from '@/api';

export default {
  state: {
    userObject: null,
    userLoading: false,
  },
  mutations: {
    SET_CURRENT_USER(state, userObject) {
      state.userObject = userObject;
    },
    SET_CURRENT_USER_LOADING(state, isLoading) {
      state.userLoading = isLoading;
    }
  },
  getters: {
    GET_CURRENT_USER: (state) => state.userObject,
    GET_CURRENT_USER_LOADING: (state) => state.userLoading
  },
  actions: {
    REGISTER_USER({ commit }, credentials) {
      commit("SET_CURRENT_USER_LOADING", true);
      return registerUser(credentials).finally(() => {
        commit("SET_CURRENT_USER_LOADING", false);
      });
    },

    LOGIN_USER({ commit }, credentials) {
      commit("SET_CURRENT_USER_LOADING", true);
      return loginUser(credentials).then((res) => {
        if (res.email) commit("SET_CURRENT_USER", res);
        return res;
      }).finally(() => {
        commit("SET_CURRENT_USER_LOADING", false);
      });
    },

    LOGOUT_USER({ commit }) {
      commit("SET_CURRENT_USER", null);
      return logoutUser();
    },

    FETCH_CURRENT_USER({ commit, getters }) {
      if (getters.GET_CURRENT_USER) {
        return Promise.resolve();
      }
      
      commit("SET_CURRENT_USER_LOADING", true);
      return getCurrentUser().then((res) => {
        if (res && res.email) {
          commit("SET_CURRENT_USER", res);
        }
      }).catch(() => {
        commit("SET_CURRENT_USER", null);
      }).finally(() => {
        commit("SET_CURRENT_USER_LOADING", false);
      });
    }
  }
};
