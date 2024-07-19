<template>
    <div>
        <Heading-1>Random picker</Heading-1>
        <Heading-2>{{ $route.params.name }} <span @click="toggleEdit">{{ editMode ? '[Cancel]' : '[Edit]' }}</span></Heading-2>

        <DonutChart
            index="name"
            category="weight"
            type="pie"
            :data="chosenList.items"
            :colors="['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']"
        />

        <section v-if="editMode" class="md:flex md:flex-row md:flex-wrap md:gap-4">
            <div class="flex-1">
                <Heading-3>Add an item</Heading-3>
                <p v-if="hasError('general')" class="error">{{ getError('general').message }}</p>

                <div class="my-2">
                    <Label>Name</Label>
                    <Input type="text" v-model="newItem.name" />
                    <p v-if="hasError('name')" class="error">{{ getError('name').message }}</p>
                </div>
                <div class="my-2">
                    <Label for="newItemWeight">Weight</Label>
                    <NumberField id="newItemWeight" v-model="newItem.weight">
                        <NumberFieldContent>
                            <NumberFieldDecrement />
                            <NumberFieldInput />
                            <NumberFieldIncrement />
                        </NumberFieldContent>
                    </NumberField>
                    <p v-if="hasError('weight')" class="error">{{ getError('weight').message }}</p>
                </div>

                <Button @click="addItem">Add item!</Button>
            </div>

            <div class="flex-1">
                <Table>
                    <template #thead>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Weight</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                      </template>
                      <TableRow v-for="item in newItems" :key="item.id">
                          <TableData>
                              <Input v-model="item.name" />
                          </TableData>
                          <TableData>
                              <NumberField id="weight" v-model="item.weight">
                                  <NumberFieldContent>
                                      <NumberFieldDecrement />
                                      <NumberFieldInput />
                                      <NumberFieldIncrement />
                                  </NumberFieldContent>
                              </NumberField>
                          </TableData>
                          <TableData>
                              <Button @click="removeItem(item)" variant="destructive">Remove</Button>
                          </TableData>
                      </TableRow>
                </Table>

                <Button @click="saveEdits">Save</Button>
            </div>
        </section>
        <div v-else>
            <Button @click="pickRandomItem">Pick an item!</Button>

            <p class="text-3xl text-red-600">{{ chosenItem.name }}</p>
        </div>

        <div class="mt-3">
            <Heading-3>Weights</Heading-3>
            <p v-for="item in chosenList.items" :key="item.name">{{ item.name }}: {{ item.weight }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useListsStore } from '@/stores/lists';

import { Button } from '@/components/ui/button';
import { DonutChart } from '@/components/ui/chart-donut';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, } from '@/components/ui/number-field';
import { Heading1, Heading2, Heading3 } from '@/components/ui/typography';
import { Table, TableRow, TableHead, TableData } from '@/components/ui/typography';

const listsStore = useListsStore();
const route = useRoute();
// Force `as List` because we are checking if the list exists _before_ this page
// can load.
const chosenList: List = listsStore.lists.filter(list => list.name === route.params.name)[0];
let chosenItem = ref<Item>({ id: 0, name: '', weight: 1 });
let newItems = ref<Array<Item>>([]);

let editMode = ref(false);
function toggleEdit() {
  editMode.value = !editMode.value;

  // Weren't editing, now we are, so save the previous items.
  if (editMode.value) {
    newItems.value = structuredClone(toRaw(chosenList.items));
  } else {
    cancelEdits();
  }
}
function removeItem(item: Item) {
  newItems.value = newItems.value.filter(curItem => curItem.id !== item.id);
}
function saveEdits() {
  editMode.value = false;
  chosenList.items = newItems.value;
}
function cancelEdits() {
  editMode.value = false;
}

const emptyItem = {
  id: 0,
  name: '',
  weight: 1,
};
let newItem = ref<Item>(structuredClone(emptyItem));
watch(newItem, () => {
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

  // Once we add the item to the list, make sure we update the edit list too.
  listsStore.addItem(chosenList.id, newItem.value);
  newItems.value = structuredClone(toRaw(chosenList.items));
  newItem.value = emptyItem;
}

function pickRandomItem() {
  // Increment all weights by 1.
  const items = chosenList.items
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
  chosenList.items[randomIndex].weight = 1;
}

let errors = ref<Array<AppError>>([]);
function hasError(key: string) {
  return errors.value.map(error => error.key).includes(key);
}
function getError(key: string) {
  return errors.value.filter(error => error.key === key)[0];
}
</script>
