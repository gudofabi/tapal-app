<template>
  <div class="relative z-10" :class="baseClass">
    <span v-if="label" class="label" :class="[textWhite && '!text-white']">{{
      label
    }}</span>
    <h1
      v-if="header"
      class="header mb-4 xl:mb-6"
      :class="[textWhite && `!text-white`, headerClass]"
      v-html="header"
    ></h1>
    <p
      v-if="description"
      class="desc mb-10"
      :class="[textWhite && '!text-white']"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: String;
  header?: String;
  headerClass?: String;
  description?: String;
  textWhite?: Boolean | false;
  baseClass?: String;
}>();
</script>
