<template>
  <div>
    <h1>Users Page</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["$auth"],
});
</script>
