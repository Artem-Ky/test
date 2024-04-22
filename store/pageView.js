export default {
  namespaced: true,
  state: () => ({
    viewState: 'grid',
    page: 1,
    limit: 4,
    totalFound: 0,
  }),
  mutations: {
    setViewState(state, payload) {
      state.viewState = payload;
    },
    setTotalPages(state, payload) {
      state.totalFound = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    }
  },
  actions: {
    initViewState({ commit }) {
      if (process.client) {
        const storedViewState = localStorage.getItem('viewState') || 'grid';
        commit('setViewState', storedViewState);
      }
    },
    updateViewState({ commit }, payload) { 
      if (process.client) {
        localStorage.setItem('viewState', payload);
        commit('setViewState', payload);
      }
    },
    setTotalFound({commit}, payload) {
        commit('setTotalPages', payload);
    },
    setPageState({commit}, payload) {
      commit('setPage', payload);
    }
  }
};
