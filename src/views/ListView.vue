<template>
    <div>
        <h1>Random picker</h1>
        <h2>{{ $route.params.name }}</h2>
        <button @click="pickRandomItem">Pick an item!</button>
        <p class="text-3xl text-red-600">{{ chosenItem.name }}</p>

        <div>
            <h3>Weights</h3>
            <p v-for="item in chosenList.items" :key="item.name">{{ item.name }}: {{ item.weight }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useListsStore } from '@/stores/lists';

const listsStore = useListsStore();
const route = useRoute();

let chosenItem = ref<Item>({ id: 0, name: '', weight: 1 });
let chosenList = ref<List>(listsStore.lists.filter(list => list.name === route.params.name)[0]);

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
