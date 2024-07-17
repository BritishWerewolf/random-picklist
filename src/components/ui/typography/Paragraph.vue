<script setup lang="ts">
import { cn } from '@/lib/utils';

let classes = {
    default: 'leading-7 [&:not(:first-child)]:mt-6',
    lead: 'text-xl text-muted-foreground',
    large: 'text-lg font-semibold',
    small: 'text-sm font-medium leading-none',
    muted: 'text-sm text-muted-foreground',
};

withDefaults(defineProps<{
    type: keyof typeof classes;
}>(), {
    type: 'default',
});
</script>

<template>
    <p :class="cn(classes[type], $attrs.class ?? '')"><slot></slot></p>
</template>
