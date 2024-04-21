<template>
  <div class="filter">
    <a href="#" class="filter__site filter__site-active">Все</a>
    <a href="#" class="filter__site">Lenta.ru</a>
    <a href="#" class="filter__site">Mos.ru</a>

    <button @click="setListViewHandler" :class="`filter__button filter__button-list ${viewStateListActive}`"></button>
    <button @click="setGridViewHandler" :class="`filter__button filter__button-grid ${viewStateGridActive}`"></button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const viewState = computed(() => store.state.pageView.viewState);
const viewStateGridActive = computed(() => viewState.value === 'grid' ? 'filter__button-grid-active' : '');
const viewStateListActive = computed(() => viewState.value === 'grid' ? '' : 'filter__button-list-active');

const setGridViewHandler = () => {
store.dispatch('pageView/updateViewState', 'grid');
};

const setListViewHandler = () => {
store.dispatch('pageView/updateViewState', 'list');
}

</script>