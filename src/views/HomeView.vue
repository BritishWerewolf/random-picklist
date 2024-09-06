<script setup lang="ts">
import { CircleArrowRight } from 'lucide-vue-next';
import { computed, ref } from 'vue';

import { DonutChart } from '@/components/ui/chart-donut';
import { Button } from '@/components/ui/button';
import { Heading2, HeroText } from '@/components/ui/typography';
import { getRandomItem } from '@/lib/lists';

const fakeData = ref<Array<List>>([
  {
    id: 1,
    name: 'Dinner Date',
    items: [
      { id: 1, name: 'Pizza', weight: 1, },
      { id: 2, name: 'Burger', weight: 2, },
      { id: 3, name: 'Steak', weight: 2, },
      { id: 4, name: 'Tacos', weight: 4, },
      { id: 5, name: 'Pasta Bake', weight: 3, },
    ],
  },
  {
    id: 2,
    name: 'What to watch',
    items: [
      { id: 1, name: 'Inception', weight: 4, },
      { id: 2, name: 'The Shawshank Redemption', weight: 1, },
      { id: 3, name: 'Pulp Fiction', weight: 3, },
      { id: 4, name: 'The Dark Knight', weight: 4, },
      { id: 5, name: 'Forrest Gump', weight: 2, },
    ],
  },
  {
    id: 3,
    name: 'Weekend Activities',
    items: [
      { id: 1, name: 'Hiking', weight: 3, },
      { id: 2, name: 'Board Games', weight: 2, },
      { id: 3, name: 'Beach Trip', weight: 4, },
      { id: 4, name: 'Museum Visit', weight: 1, },
      { id: 5, name: 'Cooking Class', weight: 3, },
    ],
  },
  {
    id: 4,
    name: 'Vacation Destinations',
    items: [
      { id: 1, name: 'Paris', weight: 4, },
      { id: 2, name: 'Tokyo', weight: 3, },
      { id: 3, name: 'New York', weight: 2, },
      { id: 4, name: 'Bali', weight: 5, },
      { id: 5, name: 'Rome', weight: 3, },
    ],
  },
  {
    id: 5,
    name: 'Book Genres',
    items: [
      { id: 1, name: 'Mystery', weight: 3, },
      { id: 2, name: 'Science Fiction', weight: 4, },
      { id: 3, name: 'Romance', weight: 2, },
      { id: 4, name: 'Non-fiction', weight: 1, },
      { id: 5, name: 'Fantasy', weight: 5, },
    ],
  },
  {
    id: 6,
    name: 'Exercise Routines',
    items: [
      { id: 1, name: 'Yoga', weight: 3, },
      { id: 2, name: 'Running', weight: 4, },
      { id: 3, name: 'Weight Lifting', weight: 2, },
      { id: 4, name: 'Swimming', weight: 3, },
      { id: 5, name: 'Cycling', weight: 1, },
    ],
  },
  {
    id: 7,
    name: 'Hobbies to Try',
    items: [
      { id: 1, name: 'Painting', weight: 2, },
      { id: 2, name: 'Gardening', weight: 3, },
      { id: 3, name: 'Photography', weight: 4, },
      { id: 4, name: 'Cooking', weight: 3, },
      { id: 5, name: 'Learning a Language', weight: 1, },
    ],
  },
  {
    id: 8,
    name: 'Pet Choices',
    items: [
      { id: 1, name: 'Dog', weight: 5, },
      { id: 2, name: 'Cat', weight: 4, },
      { id: 3, name: 'Fish', weight: 2, },
      { id: 4, name: 'Bird', weight: 1, },
      { id: 5, name: 'Rabbit', weight: 3, },
    ],
  },
]);
const fakeList = computed(() => fakeData.value[Math.floor(Math.random() * fakeData.value.length)]);

const selected = ref<Item>({
  id: 0,
  name: '',
  weight: 1,
});
function selectItem() {
  selected.value = getRandomItem(fakeList.value);
}
</script>

<template>
  <div class="flex flex-col items-center justify-around mb-20 md:flex-row">
    <div>
      <Hero-Text>Randomly picking an item <mark>the right way</mark></Hero-Text>
    </div>
    <div class="text-center">
      <p class="mb-4 text-xl font-bold">{{ fakeList.name }}</p>
      <DonutChart
        index="name"
        category="weight"
        type="pie"
        :data="fakeList.items"
      />
      <Button size="lg" class="mt-4" @click="selectItem">Pick an item</Button>
      <p class="text-lg text-primary">{{ selected.name }}</p>
    </div>
  </div>
  <div class="container">
    <p class="text-lg">A simple app that randomly selects a weighted item from a list.</p>
    <p class="text-lg">Create a list of items and assign a weight. Upon picking an item, the selected item will be reset to a weight of 1, and all others will increase by 1.</p>
    <RouterLink :to="{ name: 'create' }">
      <Button class="my-8">
        Get started
        <CircleArrowRight class="ml-2" />
      </Button>
    </RouterLink>
  </div>

  <div class="container mt-8">
    <Heading-2>Weights</Heading-2>
    <p>Weights are just a way of determining how likely an item will be selected.</p>
    <p>The higher the weight, the more likely it is to be selected. That does not mean that the highest item will be selected, just that it has more of a possibility of appearing next. This helps with ensuring that, with each new selection, each item that hasn't been chosen becomes more likely to be selected next time.</p>
  </div>
</template>
