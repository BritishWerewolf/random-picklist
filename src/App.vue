<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink
            v-for="list in listsStore.lists"
            :to="`/list/${list.name}`"
            :key="`/list/${list.name}`"
        >{{ list.name }}</RouterLink>
    </nav>

    <div>
        <RouterView :key="$route.fullPath" />
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useListsStore } from '@/stores/lists';

const listsStore = useListsStore();
</script>

<style>
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: aquamarine;
    height: 50px;
}

#app {
    margin-top: 50px;
}
</style>
