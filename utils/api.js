import axios from 'axios';
import xml2js from 'xml2js';
import { format } from 'date-fns';
import shuffleArray from '~/utils/shuffleArray';
import { truncateText, cleanTag } from '~/utils/textEdit';

export async function fetchNews() {
  try {
    const [responseMos, responseLenta] = await Promise.all([
      axios.get("https://www.mos.ru/rss", { responseType: "text" }),
      axios.get("https://lenta.ru/rss/news", { responseType: "text" }),
    ]);
    const [parsedMos, parsedLenta] = await Promise.all([
      parseRss(responseMos.data),
      parseRss(responseLenta.data),
    ]);
    

    const itemsMos = parsedMos.rss.channel[0].item
    .filter(item => item.description != null) //закоментировать если нужны новости без описания
    .map((item) => ({
      source: "www.mos.ru",
      title: item.title[0],
      link: item.link[0],
      pubDate: format(new Date(item.pubDate[0]), 'yyyy-MM-dd'),
      description: item.description ? truncateText(item.description[0], 95) : 'No description',
      imageUrl: item.enclosure ? item.enclosure[0].$.url : null,
    }));


    const itemsLenta = parsedLenta.rss.channel[0].item
    //закоментировать часть фильра (item.description[0].trim()) если нужны новости без описания
    .filter(item => item.description && cleanTag(item.description[0]) && item.description[0].trim())
    .map((item) => ({
      source: "www.lenta.ru",
      title: item.title[0],
      link: item.link[0],
      pubDate: format(new Date(item.pubDate[0]), 'yyyy-MM-dd'),
      description: item.description && cleanTag(item.description[0]) ? truncateText(item.description[0], 95) : 'No description',
      imageUrl: item.enclosure && item.enclosure[0] ? item.enclosure[0].$.url : null,
    }));


    const news = shuffleArray([...itemsMos, ...itemsLenta]);
    return news;
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    throw error;
  }
}

async function parseRss(xml) {
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);
  return result;
}
