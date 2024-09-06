<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { type ButtonVariants, buttonVariants } from '.';
import { cn } from '@/lib/utils';

const emit = defineEmits(['click']);

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  confirm?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
});

// Reactive state for managing confirmation
const isConfirming = ref(false);
const confirmDuration = 3000;
const confirmTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

// Function to handle the button click
function handleClick(event: Event) {
  if (props.confirm) {
    if (isConfirming.value) {
      // Second click when confirming
      resetConfirmState();
      emit('click', event);
    } else {
      // First click, show confirmation message
      isConfirming.value = true;

      // Set timeout to reset confirmation after 3 seconds
      confirmTimeout.value = setTimeout(() => {
        resetConfirmState();
      }, confirmDuration);

      // Prevent the initial click event from propagating
      event.preventDefault();
    }
  } else {
    // If no confirmation is needed, emit click event as normal
    emit('click', event);
  }
}

// Function to reset the confirmation state
function resetConfirmState() {
  isConfirming.value = false;
  if (confirmTimeout.value) {
    clearTimeout(confirmTimeout.value);
    confirmTimeout.value = null;
  }
}

// Clean up on unmount
onBeforeUnmount(() => {
  if (confirmTimeout.value) {
    clearTimeout(confirmTimeout.value);
  }
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    @click="handleClick"
  >
    <span v-if="isConfirming">{{ props.confirm }}</span>
    <slot v-else />
  </Primitive>
</template>
