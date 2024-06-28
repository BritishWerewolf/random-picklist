<template>
    <h1>Random picker</h1>
    <select name="list" id="list" v-model="chosenList">
        <option v-for="list in listsStore.lists" :value="list">{{ list.name }}</option>
    </select>
    <button @click="pickRandomItem">Pick an item!</button>
    {{ chosenItem }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useListsStore } from '@/stores/lists';

const listsStore = useListsStore();

// Mock the database.
if (listsStore.lists.length === 0) {
    listsStore.createList('Numbers');
    listsStore.addItem(listsStore.lists[0].id, { id: 1, name: 'First' });
    listsStore.addItem(listsStore.lists[0].id, { id: 2, name: 'Second' });
    listsStore.addItem(listsStore.lists[0].id, { id: 3, name: 'Third' });
    listsStore.addItem(listsStore.lists[0].id, { id: 4, name: 'Fourth' });
    listsStore.addItem(listsStore.lists[0].id, { id: 5, name: 'Fifth' });

    listsStore.createList('Alphabet');
    listsStore.addItem(listsStore.lists[1].id, { id: 6, name: 'Alpha' });
    listsStore.addItem(listsStore.lists[1].id, { id: 7, name: 'Beta' });
    listsStore.addItem(listsStore.lists[1].id, { id: 8, name: 'Charlie' });
    listsStore.addItem(listsStore.lists[1].id, { id: 9, name: 'Delta' });
    listsStore.addItem(listsStore.lists[1].id, { id: 10, name: 'Echo' });
}

let chosenList = ref<List>({ id: 0, name: '', items: [] });
let chosenItem = ref<Item>({ id: 0, name: '' });

onMounted(() => {
    chosenList.value = listsStore.lists[0];
});

function pickRandomItem() {
    let items = chosenList.value.items;
    const randomIndex = Math.floor(Math.random() * items.length);
    chosenItem.value = items[randomIndex];
}
</script>
