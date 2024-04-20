<template>
    <div class="news">
      <ul>
        <li
          v-for="newsItem in newsData"
          :key="newsItem.link"
          class="gridCard"
        >
          <h2 class="gridCard__title">{{ newsItem.title }}</h2>
          <p v-if="newsItem.description" class="gridCard__description">
            {{ newsItem.description }}
          </p>
          <a :href="newsItem.link" target="_blank" class="gridCard__link"
            >Подробнее</a
          >
          <span class="gridCard__source">{{ newsItem.source }}</span>
          <time class="gridCard__pubdate">{{ newsItem.pubDate }}</time>
        </li>
      </ul>
    </div>
</template>
  
  <script setup>
  import { useAsyncData } from 'nuxt/app';
  import { fetchNews } from '~/utils/api';
  const { data: newsData, error, refresh } = useAsyncData('news', fetchNews);
  </script>
  