<template>
  <div class="w-full relative">
    <TapwalCarousel
      ref="carouselRef"
      v-model="data_currentSlide"
      v-bind="data_carouselConfig"
    >
      <TapwalSlide v-for="(data, index) in data_features" :key="index">
        <CommonCard
          :icon="data.icon"
          :label="data.label"
          :description="data.description"
        />
      </TapwalSlide>
    </TapwalCarousel>
  </div>
  <div class="flex ml-5 gap-x-10">
    <UButton
      icon="heroicons:arrow-left-16-solid"
      variant="link"
      class="slide-control prev"
      @click="func_prev"
    />
    <UButton
      icon="heroicons:arrow-right-16-solid"
      variant="link"
      class="slide-control next"
      @click="func_next"
    />
  </div>
</template>

<script setup lang="ts">
const data_features = [
  {
    icon: "ph-bold ph-lightning",
    label: "Effortless Showcase",
    description:
      "A sleek, modern portfolio designed to highlight your best work with minimal effort.",
  },
  {
    icon: "ph-bold ph-palette",
    label: "Clean & Responsive Design",
    description:
      "A visually appealing, mobile-friendly layout that adapts to any screen size seamlessly.",
  },
  {
    icon: "ph-bold ph-link",
    label: "One-Page Simplicity",
    description:
      "Everything you need in a single, elegant page—no clutter, just your work.",
  },
  {
    icon: "ph-bold ph-moon",
    label: "Dark & Light Mode",
    description:
      "Switch between light and dark themes for the best viewing experience.",
  },
  {
    icon: "ph-bold ph-compass-tool",
    label: "Built with Modern Tech",
    description:
      "Powered by Vue.js and Tailwind CSS for performance, scalability, and aesthetics.",
  },
];

const carouselRef = ref();
const data_currentSlide = ref(1);

const data_carouselConfig = {
  itemsToShow: 2.5,
  gap: 25,
  snapAlign: "start",
  autoplay: 5000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};

const func_next = () => carouselRef.value.next();
const func_prev = () => carouselRef.value.prev();
</script>
