<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

const props = defineProps({
  rules: { type: Object, required: true },
  model: { type: Object, required: true },
});

const form = ref();
const v = useVuelidate(props.rules, props.model);

async function validateWithVuelidate() {
  v.value.$touch();
  await v.value.$validate();
  return v.value.$errors.map((error: any) => ({
    message: error.$message,
    path: error.$propertyPath,
  }));
}

defineExpose({
  validate: async () => {
    const isValid = await v.value.$validate();
    if (!isValid) {
      return false; // Validation failed
    }
    return true; // Validation passed
  },
});
</script>

<template>
  <UForm
    ref="form"
    :state="model"
    :validate="validateWithVuelidate"
    class="space-y-4"
  >
    <slot />
  </UForm>
</template>
