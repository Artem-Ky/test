<template>
  <div class="news">
    <ul>
      <li
        v-for="newsItem in newsData"
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
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useAsyncData } from 'nuxt/app';
import { fetchNews } from '~/utils/api';

const store = useStore();


const { data: newsData, error, refresh } = useAsyncData('news', fetchNews);


const viewState = computed(() => store.state.pageView.viewState);


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
</script>
