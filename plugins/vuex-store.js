import Vuex from 'vuex';
import pageView from '~/store/pageView';

export default defineNuxtPlugin((nuxtApp) => {
  const store = new Vuex.Store({
    modules: {
      pageView,
    }
  });

  nuxtApp.vueApp.use(store);
});