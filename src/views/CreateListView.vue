<template>
    <Heading-1 class="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">Create a new list</Heading-1>
    <form @submit.prevent="createList">
        <div>
            <Label for="name">Name</Label>
            <Input v-model="name" id="name" name="name" placeholder="Name" />
            <p v-if="hasError('name')" class="error">{{ getError('name').message }}</p>
        </div>

        <Button>Create</Button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useListsStore } from '@/stores/lists';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heading1 } from '@/components/ui/typography';

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
