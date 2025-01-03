<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Capture the verification URL
const verificationUrl = route.query.url;

// Redirect the user to the backend to verify the email
if (verificationUrl) {
  useSanctumFetch(verificationUrl)
    .then((res) => {
      router.push("/loans"); // Redirect to Loan page
    })
    .catch((err) => {
      router.push("/register"); // Redirect to register
    });
}
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <NUICard class="w-full max-w-md p-8 text-center bg-white shadow-lg mt-20">
      <div class="flex items-center justify-center mb-6">
        <!-- NuxtUI Spinner -->
        <NUISpinner size="xl" color="primary" />
      </div>
      <h1 class="text-xl font-semibold mb-4 text-primary">
        Verifying Your Email...
      </h1>
      <p class="text-base text-secondary mb-6">
        Please wait while we confirm your email address. This process may take a
        few moments.
      </p>
    </NUICard>
  </div>
</template>
