<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>

    <div>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
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
