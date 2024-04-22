<template>
  <div class="news">
    <ul>
      <li
        v-for="newsItem in paginatedNews"
        :key="newsItem.link"
        :class="viewStateContainer"
      >
      <a class="listCard__bigScreen" v-if="viewState === 'list'" :href="newsItem.link" target="_blank"></a>
      <img v-if="viewState === 'list'" :class="viewStateImg" :src="newsItem.imageUrl" :alt="newsItem.title">
        <h2 :class="viewStateTitle">{{ newsItem.title }}</h2>
        <p v-if="newsItem.description" :class="viewStateDescription">
          {{ newsItem.description }}
        </p>
        <a :href="newsItem.link" target="_blank" :class="viewStateLink">
          Подробнее
        </a>
        <span :class="viewStateSource">{{ newsItem.source }}</span>
        <time :class="viewStatePubDate">{{ newsItem.pubDate }}</time>
      </li>
    </ul>
    <paginator :currentPage="page" :limit="limit" :totalPages="totalPages" @onPaginate="HandlerPaginate"/>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useAsyncData, useRoute, useRouter } from 'nuxt/app';
import { fetchNews } from '~/utils/api';

const store = useStore();
const router = useRouter();
const route = useRoute();
const page = computed(() => {
  const pageQuery = parseInt(route.query._page, 10);
  return isNaN(pageQuery) ? 1 : pageQuery;
});
const limit = computed(() => store.state.pageView.limit);

const { data: newsData } = useAsyncData('news', () => fetchNews(page.value, limit.value));
store.dispatch('news/setNewsState', newsData);

const viewState = computed(() => store.state.pageView.viewState);
const totalPages = computed(() => {
  return store.state.pageView.totalFound > limit.value
    ? Math.ceil(store.state.pageView.totalFound / limit.value)
    : 1;
});


const viewStateContainer = computed(() => viewState.value === 'grid' ? 'gridCard' : 'listCard');
const viewStateImg = computed(() => viewState.value === 'grid' ? '' : 'listCard__img');
const viewStateTitle = computed(() => viewState.value === 'grid' ? 'gridCard__title' : 'listCard__title');
const viewStateDescription = computed(() => viewState.value === 'grid' ? 'gridCard__description' : 'listCard__description');
const viewStateLink = computed(() => viewState.value === 'grid' ? 'gridCard__link' : 'listCard__link');
const viewStateSource = computed(() => viewState.value === 'grid' ? 'gridCard__source' : 'listCard__source');
const viewStatePubDate = computed(() => viewState.value === 'grid' ? 'gridCard__pubdate' : 'listCard__pubdate');



onMounted(() => {
if (process.client) {
  const storedViewState = localStorage.getItem('viewState') || 'grid';
  store.dispatch('pageView/updateViewState', storedViewState);
}
});
watch(newsData, (currentData) => {
  if (currentData && currentData.length) {
    store.dispatch('pageView/setTotalFound', currentData.length);
  }
}, { immediate: true });


const paginatedNews = computed(() => {
  const start = (page.value - 1) * limit.value;
  return store.state.news.news.slice(start, start + limit.value);
});


const HandlerPaginate = (newPage) => {
  if (newPage === 1) {
    router.push({
      path: '/',
      query: { ...route.query, _page: undefined }
    }).then(() => {
      store.dispatch('pageView/setPageState', newPage);
    });
  } else {
    router.push({
      path: '/',
      query: { ...route.query, _page: newPage }
    }).then(() => {
      store.dispatch('pageView/setPageState', newPage);
    });
  }
};


</script>
