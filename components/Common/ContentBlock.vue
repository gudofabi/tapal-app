<template>
  <div class="relative z-10">
    <span
      v-if="label"
      class="label"
      :class="[textWhite ? '!text-white' : 'text-black']"
      >{{ label }}</span
    >
    <h1
      v-if="header"
      class="header mb-6"
      :class="[textWhite ? '!text-white' : 'text-black']"
    >
      {{ header }}
    </h1>
    <p
      v-if="description"
      class="desc mb-10"
      :class="[textWhite ? '!text-white' : 'text-black']"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: String;
  header?: String;
  description?: String;
  textWhite?: Boolean | false;
}>();
</script>
