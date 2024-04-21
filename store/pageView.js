export default {
    namespaced: true,
    state: () => ({
      viewState: 'grid'  // Начальное состояние
    }),
    mutations: {
      setViewState(state, payload) {
        state.viewState = payload;
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
          console.log('текущий стиль просмотра:', payload);
          localStorage.setItem('viewState', payload);
          commit('setViewState', payload);
        }
      },
    }
  };
  