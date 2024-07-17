<template>
    <h1>Create a new list</h1>
    <form @submit.prevent="createList">
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="name">
            <p v-if="hasError('name')" class="error">{{ getError('name').message }}</p>
        </div>

        <button type="submit">Create</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useListsStore } from '@/stores/lists';

const listsStore = useListsStore();

let name = ref('');
let list = ref<List>();
function createList() {
  if (listsStore.listNames.includes(name.value)) {
    errors.value.push({
      key: 'name',
      message: 'A list with that name already exists.',
    });
    return;
  }
  list.value = listsStore.createList(name.value);
}

let errors = ref<Array<AppError>>([]);
function hasError(key: string) {
  return errors.value.map(error => error.key).includes(key);
}
function getError(key: string) {
  return errors.value.filter(error => error.key === key)[0];
}
</script>
