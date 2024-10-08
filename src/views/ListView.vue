<script setup lang="ts">
import { computed, ref, toRaw, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useListsStore } from '@/stores/lists';

import { Trash2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { DonutChart } from '@/components/ui/chart-donut';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, } from '@/components/ui/number-field';
import {
  Heading1, Heading2,
  Table, TableRow, TableHead, TableData
} from '@/components/ui/typography';
import { getRandomItem } from '@/lib/lists';

const hasClipboardAPI = computed(() => navigator.clipboard);

const listsStore = useListsStore();
const router = useRouter();
const route = useRoute();
// Force `as List` because we are checking if the list exists _before_ this page
// can load.
const chosenList = ref<List>(listsStore.lists.filter(list => list.name === route.params.name)[0]);
let chosenItem = ref<Item>({ id: 0, name: '', weight: 1 });
let newList = ref<List>({ id: 0, name: '', items: [] });

let showCopySuccess = ref(false);
function copyToClipboard() {
  let data = {
    name: chosenList.value.name,
    items: chosenList.value.items,
  };
  let encoded = btoa(JSON.stringify(data));
  let baseUrl = window.location.href.match(/(.+)(?=\/list\/)/)?.[0];
  navigator.clipboard.writeText(`${baseUrl}/share/${encoded}`);

  showCopySuccess.value = true;
  setTimeout(() => {
    showCopySuccess.value = false;
  }, 2000);
}

function removeList() {
  listsStore.removeList(chosenList.value.id);
  router.push('/');
}

let editMode = ref(false);
function toggleEdit() {
  editMode.value = !editMode.value;

  // Weren't editing, now we are, so save the previous items.
  if (editMode.value) {
    newList.value = structuredClone(toRaw(chosenList.value));
  } else {
    cancelEdits();
  }
}
function removeItem(item: Item) {
  newList.value.items = newList.value.items.filter(curItem => curItem.id !== item.id);
}
function saveEdits() {
  editMode.value = false;
  listsStore.setList(chosenList.value.id, newList.value);
  chosenList.value = newList.value;
}
function cancelEdits() {
  editMode.value = false;
}

let newItem = ref<Item>({
  id: 0,
  name: '',
  weight: 1,
});
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

  // Saving the list is handled when leaving edit mode.
  newList.value.items.push(newItem.value);
  newItem.value = {
    id: 0,
    name: '',
    weight: 1,
  };
}

function resetWeights() {
  chosenList.value.items.forEach((item, index) => {
    item.weight = 1;
    return item;
  });
}

function pickRandomItem() {
  chosenItem.value = getRandomItem(chosenList.value);
}

let errors = ref<Array<AppError>>([]);
function hasError(key: string) {
  return errors.value.map(error => error.key).includes(key);
}
function getError(key: string) {
  return errors.value.filter(error => error.key === key)[0];
}
</script>

<template>
  <div>
    <Input
      v-if="editMode"
      v-model="newList.name"
      class="box-content p-2 mb-2 text-4xl font-bold text-center focus:text-4xl"
    />
    <Heading1 v-else class="pb-2 text-center">{{ chosenList.name }}</Heading1>

    <div class="flex flex-col items-center justify-center my-4">
      <div class="flex flex-row gap-2">
        <Button variant="secondary" @click="toggleEdit">{{ editMode ? 'Cancel' : 'Edit' }}</Button>
        <Button v-if="editMode" @click="saveEdits">Save</Button>
        <Button
          v-else-if="!editMode && hasClipboardAPI"
          :disabled="showCopySuccess"
          @click="copyToClipboard"
        >
          Share
        </Button>

        <Button class="bg-destructive text-destructive-foreground" confirm="Are you sure?" @click="removeList">Delete</Button>
      </div>
      <div
        :class="{ 'opacity-1': showCopySuccess, 'opacity-0': !showCopySuccess }"
        class="text-green-500 transition-opacity duration-300"
      >
        <p>URL copied to clipboard!</p>
      </div>
    </div>

    <div class="md:flex md:flex-row md:gap-4">
      <!-- Left / main area -->
      <div class="md:w-4/5 md:pl-[calc(20%-0.5rem)]">
        <DonutChart
          index="name"
          category="weight"
          type="pie"
          :data="editMode ? newList.items : chosenList.items"
        />

        <section v-if="editMode" class="md:flex md:flex-row md:flex-wrap md:gap-4">
          <div class="flex-1">
            <Heading2>Add an item</Heading2>
            <p v-if="hasError('general')" class="error">{{ getError('general').message }}</p>

            <div class="my-2">
              <Label>Name</Label>
              <Input v-model="newItem.name" type="text" />
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
                  <TableHead />
                </TableRow>
              </template>
              <TableRow v-for="item in newList.items" :key="item.id">
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
                  <Button variant="destructive" @click="removeItem(item)">
                    <Trash2 class="block md:hidden" />
                    <span class="hidden md:block">Remove</span>
                  </Button>
                </TableData>
              </TableRow>
            </Table>

            <Button @click="saveEdits">Save</Button>
          </div>
        </section>
        <div v-else>
          <div class="my-4 text-center">
            <Button size="lg" @click="pickRandomItem">Pick an item!</Button>
          </div>
          <p id="winner" class="text-6xl text-center">{{ chosenItem.name }}</p>
        </div>
      </div>

      <!-- Right / sidebar -->
      <div class="my-4 text-center md:my-0 md:text-left md:w-1/5">
        <Heading2>Weights <Button confirm @click="resetWeights" variant="secondary">Reset weights</Button></Heading2>
        <p v-for="item in chosenList.items" :key="item.name">{{ item.name }}: {{ item.weight }}</p>
      </div>
    </div>
  </div>
</template>
