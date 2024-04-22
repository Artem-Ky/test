import Vuex from 'vuex';
import pageView from '~/store/pageView';
import news from '~/store/news'

export default defineNuxtPlugin((nuxtApp) => {
  const store = new Vuex.Store({
    modules: {
      pageView,
      news
    }
  });

  nuxtApp.vueApp.use(store);
});