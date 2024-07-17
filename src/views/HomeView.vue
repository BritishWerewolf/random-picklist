<template>
    <h1>Home</h1>
</template>

<script setup lang="ts">
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
</script>
