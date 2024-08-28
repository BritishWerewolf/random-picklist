<script setup lang="ts">
import { GitHubIcon, XIcon } from 'vue3-simple-icons';
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
  <nav class="mb-4 grid grid-cols-[110px_1fr_100px]">
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

          <hr class="border-2 rounded-lg">

          <RouterLink v-for="list in listsStore.lists" :key="`/list/${list.name}`" :to="{ name: 'list', params: { name: list.name } }">
            {{ list.name }}
          </RouterLink>
        </div>
      </SheetContent>
    </Sheet>

    <RouterLink id="logo" class="ml-4 text-xl" :to="{ name: 'home' }">Random Picklist</RouterLink>
    <div class="flex flex-row justify-end gap-2">
      <a href="https://github.com/BritishWerewolf/random-picklist">
        <GitHubIcon />
      </a>
      <a href="https://twitter.com/BritWerewolf">
        <XIcon />
      </a>
    </div>
  </nav>

  <div>
    <RouterView :key="$route.fullPath" />
  </div>
</template>
