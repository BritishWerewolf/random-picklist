<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useListsStore } from '@/stores/lists';

import { X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, } from '@/components/ui/number-field';
import { Heading1, Heading2, Heading3 } from '@/components/ui/typography';

const router = useRouter();
const listsStore = useListsStore();

let bulkAdd = ref(false);
let newItem = ref<Omit<Item, 'id'>>({
  name: '',
  weight: 1,
});
let items = ref<Array<Omit<Item, 'id'>>>([]);
function addItem() {
  if (newItem.value.name === '') {
    addError('itemName', 'Item name cannot be empty.');
    return;
  }
  items.value.push(newItem.value);
  newItem.value = {
    name: '',
    weight: 1,
  };
}
function removeItem(item: Omit<Item, 'id'>) {
  items.value = items.value.filter(i => i.name !== item.name);
}

let list = ref<Omit<List, 'id'>>({
  name: '',
  items: [],
});

watch(list, () => {
  errors.value = errors.value.filter(err => !err.key.startsWith('list'));
}, {
  deep: true,
});

function createList() {
  if (list.value.name === '') {
    addError('listName', 'List name cannot be empty.');
    return;
  }

  if (listsStore.listNames.includes(list.value.name)) {
    addError('listName', 'A list with that name already exists.');
    return;
  }

  let newItems: Array<Item> = [];
  if (items.value.length > 0) {
    newItems = items.value.map((item, i) => ({
      id: i + 1,
      name: item.name,
      weight: item.weight,
    }));
  }

  list.value = listsStore.createList(list.value.name, newItems);

  // Redirect to the newly created list
  router.push({ name: 'list', params: { name: list.value.name } });
}

let errors = ref<Array<AppError>>([]);
function addError(key: string, message: string) {
  // Remove that key, so we can replace it.
  errors.value = errors.value.filter(err => err.key !== key);
  errors.value.push({ key, message });
}
function hasError(key: string) {
  return errors.value.map(error => error.key).includes(key);
}
function getError(key: string) {
  return errors.value.filter(error => error.key === key)[0];
}
</script>

<template>
  <Heading-1>Create a new list</Heading-1>
  <section>
    <div>
      <Label for="name">Name</Label>
      <Input
        id="name"
        v-model="list.name"
        name="name"
        placeholder="Name"
        @keyup.enter="createList"
      />
      <p v-if="hasError('listName')" class="error">{{ getError('listName').message }}</p>
    </div>

    <div class="my-4">
      <Heading-2>Add an item</Heading-2>

      <div class="flex gap-4">
        <!-- Adding a single item -->
        <div v-if="!bulkAdd" class="w-2/4">
          <Label>Name</Label>
          <Input v-model="newItem.name" type="text" @keyup.enter="addItem" />
          <p v-if="hasError('itemName')" class="error">{{ getError('itemName').message }}</p>
        </div>
        <div v-if="!bulkAdd" class="w-1/4">
          <Label for="itemWeight">Weight</Label>
          <NumberField id="itemWeight" v-model="newItem.weight" @keyup.enter="addItem">
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <p v-if="hasError('itemWeight')" class="error">{{ getError('itemWeight').message }}</p>
        </div>

        <!-- Bulk adding -->
        <div v-if="bulkAdd" class="w-3/4">
          <p>Bulk adding</p>
        </div>

        <!-- List of current items -->
        <div class="w-1/4">
          <Heading-3>Items</Heading-3>
          <p v-for="item in items" :key="item.name">
            {{ item.name }}: {{ item.weight }}
            <X class="inline-block cursor-pointer text-destructive" @click="removeItem(item)" />
          </p>
        </div>
      </div>
    </div>

    <div class="flex gap-4">
      <Button @click="addItem">Add item!</Button>
    </div>

    <Button class="mt-8" :disabled="list.name === '' || errors.length > 0" @click="createList">Create</Button>
  </section>
</template>
