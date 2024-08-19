<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';

import { useForwardPropsEmits } from 'radix-vue';
import { Checkbox } from '@/components/ui/checkbox';

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <div class="flex items-center space-x-2">
        <Checkbox v-bind="forwarded" />
        <label :for="id" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <slot />
        </label>
    </div>
</template>
