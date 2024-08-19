<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useListsStore } from '@/stores/lists';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const listsStore = useListsStore();
</script>

<template>
  <nav class="mb-4">
    <Sheet>
      <SheetTrigger>
        <Button>
          Open Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Random Picklist</SheetTitle>
        </SheetHeader>

        <div class="flex flex-col gap-2 mt-4">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
          <RouterLink :to="{ name: 'create' }">Create list</RouterLink>

          <RouterLink v-for="list in listsStore.lists" :key="`/list/${list.name}`" :to="{ name: 'list', params: { name: list.name } }">
            {{ list.name }}
          </RouterLink>
        </div>
      </SheetContent>
    </Sheet>

    <a id="logo" href="/" class="ml-4 text-xl">Random Picklist</a>
  </nav>

  <div>
    <RouterView :key="$route.fullPath" />
  </div>
</template>
