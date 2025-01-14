<template>
  <UAlert
    v-if="data_show"
    :icon="data_icons"
    :title="data_message"
    variant="soft"
    :color="(data_alertType as any)"
    class="z-50 w-[400px] max-w-[600px] right-[1%] bottom-[3%] fixed shadow-lg"
    :class="`bg-${data_alertType}-500 bg-opacity-5`"
  />
</template>
<script setup lang="ts">
const { $emitter } = useNuxtApp();

const data_message = ref("");
const data_alertType = ref("success"); // 'success' or 'error'
const data_show = ref(false);
const data_icons = ref("i-heroicons-command-line");

onMounted(() => {
  $emitter.on("alert-notification", (e: any) => {
    data_message.value = e.message;
    data_alertType.value = func_alertType(e.alertType);
    data_show.value = true;
    data_icons.value = func_iconType(e.alertType);
    setTimeout(() => {
      data_show.value = false;
    }, e.timeout || 3000);
  });
});

const func_alertType = (data: string) => {
  switch (data) {
    case "success":
      return "primary";
    case "error":
      return "rose";
    default:
      return "white";
  }
};

const func_iconType = (data: string) => {
  switch (data) {
    case "success":
      return "i-heroicons-outline:check-circle";
    case "error":
      return "i-heroicons-outline:x-circle";
    default:
      return "i-heroicons-outline:exclaimation-triangle";
  }
};
</script>
