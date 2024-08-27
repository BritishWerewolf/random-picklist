<script setup lang="ts">
import { Heading2, HeroText } from '@/components/ui/typography';
</script>

<template>
  <Hero-Text>Randomly picking an item from a list <mark>the right way</mark></Hero-Text>
  <p>A simple app that randomly selects a weighted item from a list.</p>
  <p>Create a list of items and assign a weight. Upon picking an item, the selected item will be reset to a weight of 1, and all others will increase by 1.</p>

  <Heading-2>Weights</Heading-2>
  <p>Weights are just a way of determining how likely an item will be selected.</p>
  <p>The higher the weight, the more likely it is to be selected. That does not mean that the highest item will be selected, just that it has more of a possibility of appearing next. This helps with ensuring that, with each new selection, each item that hasn't been chosen becomes more likely to be selected next time.</p>
</template>
