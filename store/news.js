export default {
    namespaced: true,
    state: () => ({
        news: []
    }),
    mutations: {
      setNews(state, payload) {
        state.news = payload;
      }
    },
    actions: {
      setNewsState({ commit }, payload) { 
          commit('setNews', payload);
      },
    },
    getters: {
      getNews: (state) => {
        return state.news;
      }
    }
  };
  