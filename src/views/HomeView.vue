<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut';
import { Heading2, HeroText } from '@/components/ui/typography';

const fakeData = [
  { name: 'Item 1', weight: 1, },
  { name: 'Item 2', weight: 2, },
  { name: 'Item 3', weight: 1, },
  { name: 'Item 4', weight: 4, },
  { name: 'Item 5', weight: 1, },
];
</script>

<template>
  <div class="flex flex-col items-center justify-around mb-20 md:flex-row">
    <div>
      <Hero-Text>Randomly picking an item <mark>the right way</mark></Hero-Text>
    </div>
    <div>
      <DonutChart
        index="name"
        category="weight"
        type="pie"
        :data="fakeData"
      />
    </div>
  </div>
  <div class="container">
    <p class="text-lg">A simple app that randomly selects a weighted item from a list.</p>
    <p class="text-lg">Create a list of items and assign a weight. Upon picking an item, the selected item will be reset to a weight of 1, and all others will increase by 1.</p>
  </div>

  <div class="container mt-8">
    <Heading-2>Weights</Heading-2>
    <p>Weights are just a way of determining how likely an item will be selected.</p>
    <p>The higher the weight, the more likely it is to be selected. That does not mean that the highest item will be selected, just that it has more of a possibility of appearing next. This helps with ensuring that, with each new selection, each item that hasn't been chosen becomes more likely to be selected next time.</p>
  </div>
</template>
