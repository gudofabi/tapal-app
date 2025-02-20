<template>
  <div
    class="card-slider p-6 pb-12 md:p-8 flex flex-col gap-y-2 md:gap-y-4 justify-center items-start"
  >
    <span class="text-3xl md:text-4xl dark:text-black" :class="icon"></span>
    <h3 class="text-xl font-dm-serif dark:text-black">{{ label }}</h3>
    <p class="text-sm sm:text-base text-[#636363]">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: String;
  label?: String;
  description?: String;
}>();
</script>
