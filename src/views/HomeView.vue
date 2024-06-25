<template>
    <h1>Random picker</h1>
    <button @click="pickRandomItem">Pick an item!</button>
    {{ chosenItem }}
</template>

<script setup lang="ts">
import { ref } from 'vue';

let chosenItem = ref<number>(0);
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function pickRandomItem() {
    const randomIndex = Math.floor(Math.random() * items.length);
    chosenItem.value = items[randomIndex];
}
</script>
