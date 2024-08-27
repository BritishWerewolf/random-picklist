<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes['class']
}>();
</script>

<template>
    <h1 :class="cn(
        'max-w-md py-20 mx-auto text-5xl font-extrabold leading-normal tracking-tight text-center scroll-m-20',
        props.class,
    )">
        <slot></slot>
    </h1>
</template>

<style scoped>
:deep(mark) {
    background: linear-gradient(120deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
