<template>
  <UContainer class="!px-0">
    <div class="relative">
      <div class="relative grid grid-cols-2 gap-11 z-10">
        <div class="content pl-10 pr-28 flex flex-col justify-evenly">
          <div class="hero-text">
            <CommonContentBlock
              :text-white="true"
              header="A sleek and modern portfolio to showcase your best work."
              description="Built for developers and creatives to highlight their projects in a simple, elegant way."
            />
            <a
              href="#features"
              class="rounded-lg font-dm-serif text-sm bg-secondary hover:bg-[#f3c600] transition-colors delay-100 text-black px-6 py-3 inline"
              >Learn more
            </a>
          </div>
          <div class="logos">
            <ul class="flex gap-x-10 items-center">
              <li>
                <img
                  src="/img/laravel.svg"
                  alt="Laravel Logo"
                  class="cursor-pointer grayscale hover:grayscale-0 transition-all delay-100 w-auto h-auto"
                />
              </li>
              <li>
                <img
                  src="/img/nuxt.svg"
                  alt="Nuxt3 Logo"
                  class="cursor-pointer grayscale hover:grayscale-0 transition-all delay-100 w-auto h-auto"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="img-cover">
          <img
            src="/img/astro-lg 1.png"
            alt=""
            class="w-auto h-auto object-contain"
          />
        </div>
      </div>
      <div
        class="absolute bg-primary rounded-3xl w-full h-[75%] z-0 top-0 left-0 overflow-hidden"
      >
        <img
          src="/img/hero-drop.svg"
          alt="Hero Drop"
          class="absolute -right-[200px] -top-[230px]"
        />
        <img
          src="/img/hero-circle.svg"
          alt="Hero Circle"
          class="absolute -left-[20px] -bottom-[20px]"
        />
      </div>
    </div>
  </UContainer>

  <UContainer>
    <div class="flex py-20 gap-x-16">
      <div class="w-1/3 relative pt-20">
        <CommonContentBlock
          label="Feature"
          header="What we bring to the table?"
          description="A seamless, modern, and elegant portfolio designed to showcase your
          work effortlessly. Built for creators who value simplicity, speed, and
          impact."
        />
        <img
          src="/img/drop-1.svg"
          alt="Drop Feature"
          class="absolute z-0 -top-20 -left-56 w-full h-full"
        />
      </div>
      <div class="w-2/3 overflow-hidden pb-20">
        <CommonFeatureCarousel />
      </div>
    </div>
  </UContainer>
</template>
<script setup lang="ts"></script>
