import Vue from "vue";
import Vuex from "vuex";
import post from './modulesPost'
import user from './modulesUser'






Vue.use(Vuex);

const store = new Vuex.Store({
  // namespaced: true,
  strict: process.env.NODE_ENV !== "production",
  // state: state,
  state: {
    isLoading: false
  },
  actions: {
    setLoading({ commit }, loading = false) {
      commit("SET_LOADING", loading);
    }
  },
  mutations: {
    SET_LOADING: (state, loading = false) => {
      state.isLoading = loading;
    }
  },

  modules: {

    post,
    user
  }
});
export default store;