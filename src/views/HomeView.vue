<template>
    <h1>Random picker</h1>
    <button @click="pickRandomItem">Pick an item!</button>
    {{ chosenItem }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useListsStore } from '@/stores/lists';

const listsStore = useListsStore();

let chosenItem = ref<Item>();
const lists = listsStore.lists;

// Mock the database.
listsStore.createList('Numbers');
listsStore.addItem(lists[0].id, { id: 1, name: 'First' });
listsStore.addItem(lists[0].id, { id: 2, name: 'Second' });
listsStore.addItem(lists[0].id, { id: 3, name: 'Third' });
listsStore.addItem(lists[0].id, { id: 4, name: 'Fourth' });
listsStore.addItem(lists[0].id, { id: 5, name: 'Fifth' });

const items = lists[0].items;

function pickRandomItem() {
    const randomIndex = Math.floor(Math.random() * items.length);
    chosenItem.value = items[randomIndex];
}
</script>
