<template>
    <div class="paginator" v-if="totalPages > 1">
      <ul>
        <li
          class="paginator__item"
          :class="{ 'paginator__item-active': isActivePage(1) }"
          @click="emit('onPaginate', 1)"
        >
          1
        </li>
        <li v-if="showRightDotters" class="paginator__item">...</li>
  
        <li
          class="paginator__item"
          :class="{ 'paginator__item-active': isActivePage(num) }"
          v-for="num in visiblePages"
          :key="num"
          @click="emit('onPaginate', num)"
        >
          {{ num }}
        </li>
  
        <li v-if="showLeftDotters" class="paginator__item">...</li>
  
        <li
          class="paginator__item"
          :class="{ 'paginator__item-active': isActivePage(totalPages) }"
          @click="emit('onPaginate', totalPages)"
        >
          {{ totalPages }}
        </li>
      </ul>
    </div>
  </template>
  
  
  <script setup>
  import { computed, defineProps, defineEmits} from "vue";
  const props = defineProps({
    currentPage: Number,
    totalPages: Number,
    limit: Number,
  });
  
  const isActivePage = (num) => {
    return props.currentPage === num;
  };
  const emit = defineEmits(["onPaginate"]);
  
  
  const visiblePages = computed(() => {
    const pages = [];
    const pagesAround = 2;
    const startPage = Math.max(props.currentPage - pagesAround, 2);
    const endPage = Math.min(props.currentPage + pagesAround, props.totalPages - 1);
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  });
  const showRightDotters = computed(() => visiblePages.value[0] > 2);
  const showLeftDotters = computed(() => visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1);
  
  
  </script>
  