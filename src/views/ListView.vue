<template>
    <div>
        <h1 class="text-3xl">Random picker</h1>
        <h2 class="text-2xl">{{ $route.params.name }} <span @click="toggleEdit">{{ editMode ? '[Cancel]' : '[Edit]' }}</span></h2>

        <div v-if="editMode">
            <h3 class="text-xl">Add an item</h3>
            <p v-if="hasError('general')" class="error">{{ getError('general').message }}</p>

            <div class="my-2">
                <label>Name</label>
                <input type="text" v-model="newItem.name">
                <p v-if="hasError('name')" class="error">{{ getError('name').message }}</p>
            </div>
            <div class="my-2">
                <label>Weight</label>
                <input type="number" v-model="newItem.weight">
                <p v-if="hasError('weight')" class="error">{{ getError('weight').message }}</p>
            </div>

            <button @click="addItem" class="p-2 my-3 text-black bg-red-600 rounded">Add item!</button>
        </div>
        <div v-else>
            <button @click="pickRandomItem" class="p-2 my-3 text-black bg-red-600 rounded">Pick an item!</button>

            <p class="text-3xl text-red-600">{{ chosenItem.name }}</p>
        </div>

        <div class="mt-3">
            <h3>Weights</h3>
            <p v-for="item in chosenList.items" :key="item.name">{{ item.name }}: {{ item.weight }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useListsStore } from '@/stores/lists';

const listsStore = useListsStore();
const route = useRoute();
// Force `as List` because we are checking if the list exists _before_ this page
// can load.
const list: List = listsStore.lists.find(list => list.name === route.params.name) as List;

let editMode = ref(false);
function toggleEdit() {
    editMode.value = !editMode.value;
}

const emptyItem = {
    id: 0,
    name: '',
    weight: 1,
};
let newItem = ref<Item>(structuredClone(emptyItem));
watch(newItem, _ => {
    errors.value = [];
}, {
    deep: true,
});
function addItem() {
    if (newItem.value.id !== 0) {
        errors.value.push({
            key: 'general',
            message: 'An ID cannot be provided.',
        });
    }
    if (newItem.value.name === '') {
        errors.value.push({
            key: 'name',
            message: 'Name is required.',
        });
    }
    if (!Number.isInteger(newItem.value.weight)) {
        errors.value.push({
            key: 'weight',
            message: 'Weight must be a number.',
        });
    }

    if (errors.value.length > 0) {
        return;
    }

    listsStore.addItem(list.id, newItem.value);
    newItem.value = emptyItem;
}

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

let errors = ref<Array<AppError>>([]);
function hasError(key: string) {
    return errors.value.map(error => error.key).includes(key);
}
function getError(key: string) {
    return errors.value.filter(error => error.key === key)[0];
}
</script>
