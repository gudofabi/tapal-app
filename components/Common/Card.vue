<template>
  <div class="card-slider p-8 flex flex-col gap-y-4 justify-center items-start">
    <span class="text-4xl" :class="icon"></span>
    <h3 class="text-xl font-dm-serif">{{ label }}</h3>
    <p class="text-[#636363]">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: String;
  label?: String;
  description?: String;
}>();
</script>
