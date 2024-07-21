<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useListsStore } from '@/stores/lists';

const listsStore = useListsStore();
</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'create' }">Create list</RouterLink>
    <RouterLink
      v-for="list in listsStore.lists"
      :key="`/list/${list.name}`"
      :to="{ name: 'list', params: { name: list.name } }"
    >
      {{ list.name }}
    </RouterLink>
  </nav>

  <div>
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style>
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: aquamarine;
    color: black;
    height: 50px;
}

#app {
    margin-top: 50px;
}
</style>
