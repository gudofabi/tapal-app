<template>
  <div>
    <h1>Report Page</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["$auth"],
});
</script>
