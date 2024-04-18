
<template>
  <section>
    <div class="header">
      <h1 class="header__title">Список новостей</h1>
      <button class="header__resetBtn"></button>
      <input type="text" class="header__searchInput"/>
    </div>
    <div class="filter">
      <a href="#" class="filter__site filter__site-active">Все</a>
      <a href="#" class="filter__site">Lenta.ru</a>
      <a href="#" class="filter__site">Mos.ru</a>

      <button class="filter__button filter__button-list"></button>
      <button class="filter__button filter__button-grid filter__button-grid-active"></button>
    </div>
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
  </section>
</template>

<script setup>
import axios from 'axios';
import xml2js from 'xml2js';
import { useAsyncData } from 'nuxt/app';
import { format } from 'date-fns';
import shuffleArray from "~/utils/shuffleArray";
let news = [];
function truncateText(text, maxLength) {
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
  if (cleanText.length > maxLength) {
    return cleanText.substring(0, maxLength) + '...';
  }
  return cleanText;
}
const parseString = (xml) => new Promise((resolve, reject) => {
  const parser = new xml2js.Parser();
  parser.parseString(xml, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});
const fetchNews = async () => {
  try {
    const [responseMos, responseLenta] = await Promise.all([
      axios.get("https://www.mos.ru/rss", { responseType: "text" }),
      axios.get("https://lenta.ru/rss/news", { responseType: "text" }),
    ]);
    const [parsedMos, parsedLenta] = await Promise.all([
      parseString(responseMos.data),
      parseString(responseLenta.data),
    ]);
    const itemsMos = parsedMos.rss.channel[0].item.map((item) => ({
      source: "www.mos.ru",
      title: item.title[0],
      link: item.link[0],
      pubDate: format(new Date(item.pubDate[0]), 'yyyy-MM-dd'),
      description: item.description && item.description[0].trim() ? truncateText(item.description[0], 95) : item.title[0],
      imageUrl: item.enclosure ? item.enclosure[0].$.url : null,
    }));

    const itemsLenta = parsedLenta.rss.channel[0].item.map((item) => ({
      source: "www.lenta.ru",
      title: item.title[0],
      link: item.link[0],
      pubDate: format(new Date(item.pubDate[0]), 'yyyy-MM-dd'),
      description: item.description && item.description[0].trim() ? truncateText(item.description[0], 95) : item.title[0],
      imageUrl: item.enclosure && item.enclosure[0] ? item.enclosure[0].$.url : null,
    }));
    news = shuffleArray([...itemsMos, ...itemsLenta]);
    return news;
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    throw error;
  }
};


const { data: newsData, error, refresh } = useAsyncData('news', fetchNews);

</script>
