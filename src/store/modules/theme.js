const state = {
  currentTheme: localStorage.getItem("theme") || "light",
};

const getters = {
  currentTheme: (state) => state.currentTheme,
  isDark: (state) => state.currentTheme === "dark",
};

const mutations = {
  SET_THEME(state, theme) {
    state.currentTheme = theme;
    localStorage.setItem("theme", theme);
  },
};

const actions = {
  setTheme({ commit }, theme) {
    commit("SET_THEME", theme);
  },
  toggleTheme({ commit, state }) {
    const newTheme = state.currentTheme === "light" ? "dark" : "light";
    commit("SET_THEME", newTheme);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
