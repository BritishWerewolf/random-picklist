<script setup lang="ts">
</script>

<template>
    <div class="w-full my-6 overflow-y-auto">
        <table class="w-full">
            <thead v-if="$slots.thead">
                <slot name="thead"></slot>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>
