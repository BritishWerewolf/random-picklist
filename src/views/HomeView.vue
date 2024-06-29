<template>
    <h1>Random picker</h1>
    <select name="list" id="list" v-model="chosenList">
        <option v-for="list in listsStore.lists" :value="list">{{ list.name }}</option>
    </select>
    <h2>{{ chosenList.name }}</h2>
    <button @click="pickRandomItem">Pick an item!</button>
    <p class="text-3xl text-red-600">{{ chosenItem.name }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useListsStore } from '@/stores/lists';

const listsStore = useListsStore();

// Mock the database.
if (listsStore.lists.length === 0) {
    listsStore.createList('Numbers');
    listsStore.addItem(listsStore.lists[0].id, { id: 1, name: 'First', weight: 1 });
    listsStore.addItem(listsStore.lists[0].id, { id: 2, name: 'Second', weight: 1 });
    listsStore.addItem(listsStore.lists[0].id, { id: 3, name: 'Third', weight: 1 });
    listsStore.addItem(listsStore.lists[0].id, { id: 4, name: 'Fourth', weight: 1 });
    listsStore.addItem(listsStore.lists[0].id, { id: 5, name: 'Fifth', weight: 1 });

    listsStore.createList('Alphabet');
    listsStore.addItem(listsStore.lists[1].id, { id: 6, name: 'Alpha', weight: 1 });
    listsStore.addItem(listsStore.lists[1].id, { id: 7, name: 'Beta', weight: 1 });
    listsStore.addItem(listsStore.lists[1].id, { id: 8, name: 'Charlie', weight: 1 });
    listsStore.addItem(listsStore.lists[1].id, { id: 9, name: 'Delta', weight: 1 });
    listsStore.addItem(listsStore.lists[1].id, { id: 10, name: 'Echo', weight: 1 });
}

let chosenList = ref<List>({ id: 0, name: '', items: [] });
let chosenItem = ref<Item>({ id: 0, name: '', weight: 1 });

onMounted(() => {
    chosenList.value = listsStore.lists[0];
});

function pickRandomItem() {
    // Increment all weights by 1.
    const items = chosenList.value.items
    .map(item => ({ ...item, weight: item.weight++ }));

    // Calculate cumulative weights.
    const cumulativeWeights: Array<number> = [];
    let cumulativeWeight = 0;
    items.forEach(item => {
        cumulativeWeight += item.weight;
        cumulativeWeights.push(cumulativeWeight);
    });

    // Generate a random index and store that item.
    const randomWeight = Math.random() * cumulativeWeight;
    const randomIndex = cumulativeWeights.findIndex(weight => weight >= randomWeight);
    chosenItem.value = items[randomIndex];

    // Reset the weight of the selected item to 1.
    chosenList.value.items[randomIndex].weight = 1;
}
</script>
