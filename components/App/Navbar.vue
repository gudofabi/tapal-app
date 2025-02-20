<template>
  <div class="bg-white dark:bg-gray-800">
    <UContainer
      class="container mx-auto flex justify-between items-center py-5 md:py-10 w-full"
    >
      <div>
        <router-link to="/" class="font-dm-serif text-2xl md:text-4xl relative"
          >Tapwal
          <span class="text-xl absolute ml-1 font-outfit">™</span></router-link
        >
      </div>
      <div class="flex items-center">
        <UHorizontalNavigation
          :links="filteredLinks"
          :ui="{
            wrapper: 'w-auto hidden md:block',
            base: 'px-4 text-base hover:before:bg-transparent',
          }"
        />
        <UButton
          color="gray"
          variant="ghost"
          aria-label="Theme"
          @click="isDark = !isDark"
          size="sm"
          class="mr-1"
        >
          <UIcon
            :name="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            class="text-xl"
          />
        </UButton>
        <UIcon
          name="i-heroicons-outline:menu-alt-1"
          class="text-3xl md:hidden"
          @click="data_navShow = !data_navShow"
        />
        <UPopover v-if="isLoggedIn" class="hidden md:block">
          <UButton
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-chevron-down-20-solid"
            :label="
              user ? `${user.name} (${user.role.toUpperCase()})` : 'Profile'
            "
          >
            <template #leading>
              <UAvatar
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                size="sm"
              />
            </template>
          </UButton>

          <template #panel="{ close }">
            <div class="p-2">
              <UVerticalNavigation :links="data_profileLinks" />
            </div>
          </template>
        </UPopover>
      </div>
    </UContainer>
  </div>
  <USlideover v-model="data_navShow">
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="font-dm-serif text-2xl md:text-4xl relative"
            >Tapwal
            <span class="text-xl absolute ml-1 font-outfit"
              >™</span
            ></router-link
          >
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="data_navShow = !data_navShow"
          />
        </div>
      </template>
      <div class="flex items-center gap-x-3 px-3 pb-3" v-if="isLoggedIn">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          size="sm"
        />
        <p>{{ user.name }} ({{ user.role.toUpperCase() }})</p>
      </div>
      <UVerticalNavigation
        :links="filteredLinks"
        :ui="{
          base: 'py-4 text-base hover:before:bg-transparent',
        }"
      />
      <UVerticalNavigation
        v-if="isLoggedIn"
        :links="data_profileLinks"
        :ui="{
          base: 'py-4 text-base hover:before:bg-transparent',
        }"
      />
    </UCard>
  </USlideover>
</template>

<script setup lang="ts">
const { isLoggedIn, user, logout } = useSanctum();

const route = useRoute();

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
const data_navShow = ref(false);

watch(
  () => route.path,
  (data) => {
    data_navShow.value = false;
  }
);

const func_logout = () => {
  logout();
};

// Profile computed property
const comp_profile = computed(() => {
  return user ? user.name : "Profile";
});

// All links (public and private combined)
const allLinks = [
  {
    label: "Loans",
    icon: "i-heroicons-outline:clipboard-check",
    to: "/loans",
    private: true, // Only for authenticated users
  },
  // {
  //   label: "Reports",
  //   icon: "i-heroicons-chart-bar",
  //   to: "/report",
  //   private: true, // Only for authenticated users
  // },
  {
    label: "Users",
    icon: "i-heroicons-outline:users",
    to: "/users",
    private: true, // Only for authenticated users
    adminOnly: true, // Visible only for admin role
  },
  {
    label: "Login",
    icon: "i-heroicons-outline:finger-print",
    to: "/login",
    private: false, // Public link
  },
  {
    label: "Register",
    icon: "i-heroicons-outline:lock-closed",
    to: "/register",
    private: false, // Public link
  },
];

const filteredLinks = computed(() => {
  if (!isLoggedIn.value) {
    // Show only public links if the user is not logged in
    return allLinks.filter((link) => !link.private);
  }

  // If logged in, filter links based on role
  return allLinks.filter((link) => {
    if (link.to === "/users") {
      // Only show the Users page for admin or lender roles
      return ["admin", "lender"].includes(user.value?.role);
    }

    // Exclude public links for logged-in users
    if (!link.private) {
      return false;
    }

    // Show all other private links
    return true;
  });
});

const data_profileLinks = [
  {
    label: "Settings",
    icon: "i-heroicons-outline:cog",
    to: "/settings/profile",
  },
  {
    label: "Logout",
    icon: "i-heroicons-outline:logout",
    click: func_logout,
  },
];
</script>
