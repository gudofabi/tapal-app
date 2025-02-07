<template>
  <UContainer class="!px-0 pb-10">
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
        class="absolute bg-primary dark:bg-opacity-45 rounded-3xl w-full h-[75%] z-0 top-0 left-0 overflow-hidden"
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
    <div class="flex py-32 gap-x-16">
      <div class="w-1/3 relative pt-20">
        <CommonContentBlock
          label="Feature"
          header="What we bring to the table?"
          description="A seamless, modern, and elegant portfolio designed to showcase your
          work effortlessly. Built for creators who value simplicity, speed, and
          impact."
        />
        <svg
          width="519"
          height="555"
          viewBox="0 0 519 555"
          class="absolute z-0 -top-20 -left-56 w-full h-full fill-[#f3f3f3] dark:fill-primary dark:opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M249.167 339.739C240.651 345.869 238.718 357.741 244.847 366.257L291.638 431.256C297.768 439.772 295.834 451.644 287.318 457.775C278.803 463.904 276.869 475.777 282.999 484.292L292.816 497.928C298.945 506.443 297.012 518.315 288.496 524.446C279.981 530.576 268.109 528.642 261.978 520.127L104.195 300.942C98.0647 292.427 99.9983 280.554 108.514 274.424C117.029 268.294 118.963 256.422 112.833 247.906L103.017 234.271C96.8868 225.755 98.8204 213.883 107.336 207.752C115.851 201.623 117.785 189.75 111.655 181.235L64.8647 116.236C58.7349 107.721 60.6686 95.8485 69.1839 89.7187C77.6993 83.5889 89.5715 85.5225 95.702 94.0379L121.959 130.513C128.089 139.028 139.961 140.962 148.476 134.832C156.992 128.702 168.864 130.636 174.994 139.151L209.229 186.707C215.359 195.223 227.232 197.157 235.747 191.027C244.263 184.897 246.196 173.024 240.067 164.508L226.366 145.476C220.236 136.961 222.169 125.089 230.685 118.959C239.2 112.829 241.134 100.956 235.004 92.4407L207.083 53.6536C200.953 45.1382 202.886 33.2659 211.402 27.1354C219.917 21.0056 231.789 22.9392 237.92 31.4547L265.842 70.2418C271.971 78.7571 283.844 80.6908 292.359 74.561C300.874 68.4311 312.747 70.3648 318.877 78.8802L476.661 298.064C482.791 306.579 480.857 318.452 472.342 324.582C463.826 330.711 451.954 328.778 445.824 320.262L417.902 281.475C411.772 272.96 399.9 271.026 391.384 277.156C382.869 283.286 380.935 295.158 387.065 303.673L414.986 342.46C421.116 350.976 419.182 362.848 410.667 368.978C402.152 375.108 400.218 386.98 406.348 395.495L420.049 414.529C426.178 423.044 424.245 434.917 415.73 441.046C407.214 447.176 395.342 445.243 389.211 436.727L354.977 389.171C348.847 380.655 336.974 378.722 328.459 384.852C319.944 390.981 308.072 389.048 301.942 380.532L275.685 344.058C269.554 335.542 257.682 333.609 249.167 339.739Z"
          />
          <path
            d="M425.937 486.666C415.344 484.957 408.142 474.985 409.851 464.391C411.559 453.798 421.532 446.596 432.126 448.305C442.719 450.013 449.921 459.986 448.212 470.58C446.503 481.173 436.531 488.375 425.937 486.666Z"
          />
        </svg>
      </div>
      <div class="w-2/3 overflow-hidden pb-20">
        <CommonFeatureCarousel />
      </div>
    </div>
  </UContainer>

  <div class="w-full overflow-hidden">
    <UContainer class="relative">
      <div class="relative grid grid-cols-2 gap-x-11 pb-48">
        <div class="relative"></div>
        <div class="relative pr-20">
          <CommonContentBlock
            class="mb-12"
            label="Creator"
            header="Meet the<br>handsome creator..."
            description="Meet the genius behind the pixels. Crafting sleek designs, writing elegant code, and probably drinking too much coffee. Passionate about creating digital experiences that are as smooth as a well-written algorithm. If perfection had a portfolio, this would be it."
          />
          <h3 class="font-dm-serif text-xl mb-4">Contact me...</h3>
          <div class="flex gap-x-6 text-4xl">
            <a
              href="https://www.gudofabi.com"
              class="ph-fill ph-globe-hemisphere-east hover:text-primary transition-colors delay-100"
            ></a>
            <a
              href="https://www.linkedin.com/in/gudofabi/"
              class="ph-fill ph-linkedin-logo hover:text-primary transition-colors delay-100"
            ></a>
            <a
              href="mailto:godofredocpanel@gmail.com"
              class="ph-fill ph-mailbox hover:text-primary transition-colors delay-100"
            ></a>
          </div>
        </div>
      </div>
      <div class="relative z-10">
        <UContainer class="text-center">
          <p class="max-w-3xl mx-auto pb-6 text-gray-400 text-sm">
            © 2025 Tapwal. The Tapwal design is a trademark of Tapwal. Explore a
            curated portfolio of innovative web solutions, sleek designs, and
            cutting-edge development at
            <a
              href="https://www.tapwal.site"
              target="_blank"
              rel="noopener noreferrer"
              >www.tapwal.site</a
            >
            .
          </p>
        </UContainer>
      </div>
      <!-- <img src="/img/drop-2.svg" alt="Creator Drop" /> -->
      <svg
        width="542"
        height="575"
        viewBox="0 0 542 575"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute -bottom-40 z-0 -right-40 fill-[#f3f3f3] dark:fill-primary dark:opacity-10"
      >
        <path
          d="M284.364 225.322C293.209 219.679 295.806 207.934 290.164 199.088L247.093 131.566C241.451 122.72 244.048 110.975 252.894 105.332C261.739 99.6896 264.336 87.9445 258.693 79.0987L249.658 64.9338C244.015 56.088 246.612 44.3428 255.458 38.6997C264.303 33.0572 276.049 35.6538 281.692 44.4998L426.931 272.191C432.573 281.037 429.977 292.782 421.131 298.425C412.285 304.067 409.688 315.812 415.331 324.658L424.367 338.823C430.009 347.669 427.413 359.414 418.567 365.057C409.721 370.7 407.124 382.445 412.767 391.291L455.837 458.812C461.479 467.658 458.883 479.403 450.037 485.045C441.191 490.688 429.446 488.091 423.803 479.245L399.634 441.355C393.991 432.509 382.246 429.913 373.4 435.555C364.555 441.198 352.809 438.601 347.166 429.755L315.653 380.353C310.011 371.507 298.265 368.91 289.419 374.553C280.573 380.195 277.977 391.941 283.619 400.787L296.231 420.558C301.873 429.404 299.277 441.149 290.431 446.791C281.585 452.434 278.988 464.18 284.631 473.025L310.332 513.318C315.975 522.164 313.378 533.909 304.532 539.552C295.686 545.194 283.941 542.598 278.298 533.752L252.596 493.459C246.954 484.613 235.209 482.017 226.363 487.659C217.517 493.302 205.772 490.705 200.129 481.859L54.8897 254.169C49.2472 245.323 51.8438 233.578 60.6896 227.936C69.5354 222.293 81.2805 224.89 86.9237 233.736L112.625 274.028C118.268 282.874 130.013 285.471 138.859 279.828C147.705 274.186 150.302 262.441 144.659 253.595L118.958 213.303C113.315 204.457 115.912 192.712 124.758 187.069C133.604 181.427 136.2 169.682 130.558 160.836L117.946 141.063C112.304 132.218 114.9 120.473 123.746 114.83C132.592 109.188 144.337 111.784 149.98 120.63L181.493 170.032C187.136 178.878 198.882 181.475 207.727 175.832C216.572 170.19 228.318 172.786 233.96 181.632L258.129 219.522C263.772 228.368 275.518 230.965 284.364 225.322Z"
        />
        <path
          d="M116.114 68.7093C126.595 71.0098 133.226 81.371 130.926 91.8518C128.625 102.333 118.264 108.964 107.783 106.664C97.3024 104.363 90.6709 94.0018 92.9714 83.5211C95.2718 73.0403 105.633 66.4089 116.114 68.7093Z"
        />
      </svg>
    </UContainer>
  </div>
</template>
<script setup lang="ts"></script>
