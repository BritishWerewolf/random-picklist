<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut';

const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
];

const valueFormatter = (tick: number | Date) => typeof tick === 'number'
  ? `£${new Intl.NumberFormat('gb').format(tick).toString()}`
  : '';
</script>

<template>
  <DonutChart
    index="name"
    category="total"
    type="pie"
    :data="data"
    :value-formatter="valueFormatter"
    :colors="['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']"
  />
</template>
